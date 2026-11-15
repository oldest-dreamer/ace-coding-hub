import type { User } from '@supabase/supabase-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isSupabaseConfigured, isUserAdminAccount, supabase } from '../lib/supabase';
import type {
  ContentOverrideRecord,
  SavedCodeEntry,
  TargetGoal,
  UserProfile,
  UserProgressRow,
} from '../types/academy';
import {
  makeSavedCodeKey,
  mergeGuestAndCloudProfile,
  type CloudProfileRow,
} from '../utils/cloudMerge';
import { computeLevelProgress } from '../utils/gamification';
import { loadLocalSavedCodeMap, saveLocalSavedCodeMap } from '../utils/storage';

export type CloudSyncStatus = 'guest' | 'syncing' | 'synced' | 'offline' | 'error';

interface UseCloudProgressOptions {
  profile: UserProfile;
  hydrated: boolean;
  onApplyMergedProfile: (next: UserProfile) => void;
}

export function useCloudProgress({
  profile,
  hydrated,
  onApplyMergedProfile,
}: UseCloudProgressOptions) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<CloudSyncStatus>(
    isSupabaseConfigured ? 'guest' : 'offline',
  );
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [savedCodeMap, setSavedCodeMap] = useState<Record<string, SavedCodeEntry>>(() =>
    loadLocalSavedCodeMap(),
  );
  const [contentOverrides, setContentOverrides] = useState<Record<string, ContentOverrideRecord>>(
    {},
  );

  const profileRef = useRef<UserProfile>(profile);
  profileRef.current = profile;

  const savedCodeRef = useRef<Record<string, SavedCodeEntry>>(savedCodeMap);
  savedCodeRef.current = savedCodeMap;

  const onApplyMergedRef = useRef(onApplyMergedProfile);
  onApplyMergedRef.current = onApplyMergedProfile;

  const mergedUserIdRef = useRef<string | null>(null);
  const skipNextPushRef = useRef<boolean>(false);
  const pushTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const codeTimeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const lastPushedItemsRef = useRef<{
    chapters: Set<string>;
    problems: Set<string>;
    bookmarks: Set<string>;
  }>({
    chapters: new Set(),
    problems: new Set(),
    bookmarks: new Set(),
  });

  // Load live content overrides for both guests and signed-in users
  const refreshContentOverrides = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('content_overrides')
        .select('id, target_type, payload, updated_by, updated_at');
      if (error || !Array.isArray(data)) return;
      const nextMap: Record<string, ContentOverrideRecord> = {};
      for (const row of data) {
        if (row && typeof row.id === 'string') {
          nextMap[row.id] = {
            id: row.id,
            target_type: row.target_type as ContentOverrideRecord['target_type'],
            payload: (row.payload ?? {}) as Record<string, unknown>,
            updated_by: row.updated_by,
            updated_at: row.updated_at,
          };
        }
      }
      setContentOverrides(nextMap);
    } catch {
      // Non-fatal: built-in curriculum remains available
    }
  }, []);

  useEffect(() => {
    void refreshContentOverrides();
  }, [refreshContentOverrides]);

  // Helper to write full profile + progress diff to Supabase
  const pushProfileSnapshotToCloud = useCallback(
    async (user: User, snapshot: UserProfile) => {
      if (!supabase) return;
      setSyncStatus('syncing');
      setSyncError(null);
      try {
        const lvl = computeLevelProgress(snapshot.xp);
        const isAdmin = isUserAdminAccount(user.email, snapshot.isAdmin);
        const { error: profErr } = await supabase.from('profiles').upsert(
          {
            id: user.id,
            email: user.email ?? snapshot.email ?? null,
            username: snapshot.username.slice(0, 32),
            full_name:
              snapshot.fullName ||
              (typeof user.user_metadata?.full_name === 'string'
                ? user.user_metadata.full_name
                : null),
            target_goal: snapshot.targetGoal || 'Competitive Programming',
            avatar_seed: snapshot.avatarSeed || snapshot.username[0]?.toUpperCase() || 'L',
            preferred_language: snapshot.preferredLanguage,
            theme: snapshot.theme,
            xp: snapshot.xp,
            level: lvl.level,
            streak_days: snapshot.streakDays,
            contest_rating: snapshot.contestRating,
            last_active_date: snapshot.lastActiveDate,
            is_admin: isAdmin,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' },
        );
        if (profErr) throw profErr;

        const nowIso = new Date().toISOString();
        const rowsToUpsert: UserProgressRow[] = [];

        for (const chId of snapshot.completedChapters) {
          if (!lastPushedItemsRef.current.chapters.has(chId)) {
            rowsToUpsert.push({
              user_id: user.id,
              item_id: chId,
              item_type: 'chapter',
              status: 'completed',
              saved_code: null,
              language: null,
              metadata: {},
              updated_at: nowIso,
            });
            lastPushedItemsRef.current.chapters.add(chId);
          }
        }

        for (const probId of snapshot.solvedProblems) {
          if (!lastPushedItemsRef.current.problems.has(probId)) {
            rowsToUpsert.push({
              user_id: user.id,
              item_id: probId,
              item_type: 'problem',
              status: 'solved',
              saved_code: null,
              language: null,
              metadata: {},
              updated_at: nowIso,
            });
            lastPushedItemsRef.current.problems.add(probId);
          }
        }

        for (const bm of snapshot.bookmarks) {
          const bmKey = `bm-${bm.targetId || bm.id}`;
          if (!lastPushedItemsRef.current.bookmarks.has(bmKey)) {
            rowsToUpsert.push({
              user_id: user.id,
              item_id: bmKey,
              item_type: 'bookmark',
              status: 'bookmarked',
              saved_code: null,
              language: bm.languageId ?? null,
              metadata: bm as unknown as Record<string, unknown>,
              updated_at: nowIso,
            });
            lastPushedItemsRef.current.bookmarks.add(bmKey);
          }
        }

        if (rowsToUpsert.length > 0) {
          const { error: progErr } = await supabase
            .from('user_progress')
            .upsert(rowsToUpsert, { onConflict: 'user_id,item_id' });
          if (progErr) throw progErr;
        }

        const syncedTime = new Date().toISOString();
        setLastSyncedAt(syncedTime);
        setSyncStatus('synced');
      } catch (err) {
        setSyncStatus('error');
        setSyncError(err instanceof Error ? err.message : 'Cloud sync failed.');
      }
    },
    [],
  );

  // Perform guest-to-cloud hydration & automatic union/max merge on sign-in
  const hydrateAndMergeForUser = useCallback(
    async (user: User) => {
      if (!supabase) return;
      if (mergedUserIdRef.current === user.id) return;
      mergedUserIdRef.current = user.id;
      setSyncStatus('syncing');
      setSyncError(null);

      try {
        const [{ data: cloudRow, error: profErr }, { data: progressRows, error: progErr }] =
          await Promise.all([
            supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
            supabase.from('user_progress').select('*').eq('user_id', user.id),
          ]);

        if (profErr) throw profErr;
        if (progErr) throw progErr;

        const isAdminFromMeta = isUserAdminAccount(
          user.email,
          (cloudRow as CloudProfileRow | null)?.is_admin,
        );

        const metaUsername =
          typeof user.user_metadata?.username === 'string' && user.user_metadata.username.trim()
            ? user.user_metadata.username.trim()
            : typeof user.user_metadata?.full_name === 'string' &&
                user.user_metadata.full_name.trim()
              ? user.user_metadata.full_name.trim()
              : null;

        const metaGoal =
          typeof user.user_metadata?.target_goal === 'string'
            ? user.user_metadata.target_goal
            : null;

        const effectiveCloudRow: CloudProfileRow | null = cloudRow
          ? (cloudRow as CloudProfileRow)
          : metaUsername || metaGoal
            ? {
                id: user.id,
                email: user.email ?? null,
                username: metaUsername,
                target_goal: metaGoal,
                is_admin: isAdminFromMeta,
              }
            : null;

        const safeProgressRows = Array.isArray(progressRows)
          ? (progressRows as UserProgressRow[])
          : [];

        const { mergedProfile, mergedCodeMap } = mergeGuestAndCloudProfile(
          profileRef.current,
          effectiveCloudRow,
          safeProgressRows,
          savedCodeRef.current,
          { email: user.email, isAdmin: isAdminFromMeta },
        );

        lastPushedItemsRef.current = {
          chapters: new Set(
            safeProgressRows
              .filter((r) => r.item_type === 'chapter')
              .map((r) => r.item_id),
          ),
          problems: new Set(
            safeProgressRows
              .filter((r) => r.item_type === 'problem')
              .map((r) => r.item_id),
          ),
          bookmarks: new Set(
            safeProgressRows
              .filter((r) => r.item_type === 'bookmark')
              .map((r) => r.item_id),
          ),
        };

        setSavedCodeMap(mergedCodeMap);
        saveLocalSavedCodeMap(mergedCodeMap);
        skipNextPushRef.current = true;
        onApplyMergedRef.current(mergedProfile);

        // Push merged state back up cleanly so guest offline work lands in Supabase
        await pushProfileSnapshotToCloud(user, mergedProfile);
      } catch (err) {
        mergedUserIdRef.current = null;
        setSyncStatus('error');
        setSyncError(err instanceof Error ? err.message : 'Unable to merge cloud progress.');
      }
    },
    [pushProfileSnapshotToCloud],
  );

  // Subscribe to Supabase Auth session & updates
  useEffect(() => {
    if (!supabase) {
      setAuthChecked(true);
      setSyncStatus('offline');
      return;
    }

    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        const user = data.session?.user ?? null;
        setAuthUser(user);
        setAuthChecked(true);
        if (!user) {
          setSyncStatus('guest');
        }
      })
      .catch(() => {
        if (!active) return;
        setAuthChecked(true);
        setSyncStatus('guest');
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      const user = session?.user ?? null;
      setAuthUser(user);
      setAuthChecked(true);
      if (!user) {
        mergedUserIdRef.current = null;
        setSyncStatus('guest');
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Once local profile is hydrated AND auth user is present, run merge
  useEffect(() => {
    if (!hydrated || !authChecked || !authUser) return;
    void hydrateAndMergeForUser(authUser);
  }, [hydrated, authChecked, authUser, hydrateAndMergeForUser]);

  // Debounced auto-sync whenever profile changes while signed in
  useEffect(() => {
    if (!hydrated || !authUser || !supabase) return;
    if (skipNextPushRef.current) {
      skipNextPushRef.current = false;
      return;
    }
    if (pushTimeoutRef.current) clearTimeout(pushTimeoutRef.current);
    pushTimeoutRef.current = setTimeout(() => {
      void pushProfileSnapshotToCloud(authUser, profile);
    }, 650);

    return () => {
      if (pushTimeoutRef.current) clearTimeout(pushTimeoutRef.current);
    };
  }, [profile, hydrated, authUser, pushProfileSnapshotToCloud]);

  // Per-item editor code lookup + debounced local & cloud save
  const getSavedCode = useCallback(
    (itemId: string, language: string): string | null => {
      const key = makeSavedCodeKey(itemId, language);
      return savedCodeMap[key]?.code ?? null;
    },
    [savedCodeMap],
  );

  const saveItemCode = useCallback(
    (itemId: string, language: string, code: string) => {
      const key = makeSavedCodeKey(itemId, language);
      const updatedAt = new Date().toISOString();

      setSavedCodeMap((prev) => {
        if (prev[key]?.code === code) return prev;
        const next = {
          ...prev,
          [key]: { code, language, updatedAt },
        };
        saveLocalSavedCodeMap(next);
        return next;
      });

      if (!authUser || !supabase) return;
      if (codeTimeoutRef.current[key]) {
        clearTimeout(codeTimeoutRef.current[key]);
      }
      codeTimeoutRef.current[key] = setTimeout(async () => {
        if (!supabase) return;
        try {
          await supabase.from('user_progress').upsert(
            {
              user_id: authUser.id,
              item_id: key,
              item_type: 'code',
              status: 'in_progress',
              saved_code: code,
              language,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,item_id' },
          );
          setLastSyncedAt(new Date().toISOString());
        } catch {
          // Local copy already persisted
        }
      }, 850);
    },
    [authUser],
  );

  // Auth Actions
  const signInWithEmail = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ ok: true } | { ok: false; error: string }> => {
      if (!supabase) {
        return {
          ok: false,
          error: 'Supabase environment variables are not configured in this workspace.',
        };
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    },
    [],
  );

  const signUpWithEmail = useCallback(
    async (params: {
      email: string;
      password: string;
      username: string;
      targetGoal: TargetGoal;
    }): Promise<{ ok: true; needsEmailConfirmation: boolean } | { ok: false; error: string }> => {
      if (!supabase) {
        return {
          ok: false,
          error: 'Supabase environment variables are not configured in this workspace.',
        };
      }
      const cleanName = params.username.trim().slice(0, 32) || 'Learner';
      const { data, error } = await supabase.auth.signUp({
        email: params.email.trim(),
        password: params.password,
        options: {
          data: {
            username: cleanName,
            full_name: cleanName,
            target_goal: params.targetGoal,
          },
        },
      });
      if (error) return { ok: false, error: error.message };
      return {
        ok: true,
        needsEmailConfirmation: !data.session,
      };
    },
    [],
  );

  const signInWithGoogle = useCallback(async (): Promise<
    { ok: true } | { ok: false; error: string }
  > => {
    if (!supabase) {
      return {
        ok: false,
        error: 'Supabase environment variables are not configured.',
      };
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    mergedUserIdRef.current = null;
    setAuthUser(null);
    setSyncStatus(isSupabaseConfigured ? 'guest' : 'offline');
    onApplyMergedRef.current({
      ...profileRef.current,
      email: undefined,
      isAdmin: false,
      cloudSync: {
        provider: 'local',
      },
    });
  }, []);

  const syncNow = useCallback(async () => {
    if (!authUser) return;
    await pushProfileSnapshotToCloud(authUser, profileRef.current);
  }, [authUser, pushProfileSnapshotToCloud]);

  // Admin Content CMS Overrides (Live save + Revert to Built-in)
  const saveContentOverride = useCallback(
    async (
      id: string,
      targetType: ContentOverrideRecord['target_type'],
      payload: Record<string, unknown>,
    ): Promise<{ ok: true } | { ok: false; error: string }> => {
      if (!supabase || !authUser) {
        return {
          ok: false,
          error: 'Sign in with an admin account to publish live content overrides.',
        };
      }
      const record: ContentOverrideRecord = {
        id,
        target_type: targetType,
        payload,
        updated_by: authUser.id,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase
        .from('content_overrides')
        .upsert(record, { onConflict: 'id' });
      if (error) {
        return { ok: false, error: error.message };
      }
      setContentOverrides((prev) => ({
        ...prev,
        [id]: record,
      }));
      return { ok: true };
    },
    [authUser],
  );

  const revertContentOverride = useCallback(
    async (id: string): Promise<{ ok: true } | { ok: false; error: string }> => {
      if (!supabase || !authUser) {
        return {
          ok: false,
          error: 'Sign in with an admin account to revert overrides.',
        };
      }
      const { error } = await supabase.from('content_overrides').delete().eq('id', id);
      if (error) {
        return { ok: false, error: error.message };
      }
      setContentOverrides((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      return { ok: true };
    },
    [authUser],
  );

  const isAdmin = Boolean(
    authUser && isUserAdminAccount(authUser.email ?? profile.email, profile.isAdmin),
  );

  return {
    authUser,
    authChecked,
    isAuthenticated: Boolean(authUser),
    isAdmin,
    syncStatus,
    syncError,
    lastSyncedAt,
    contentOverrides,
    getSavedCode,
    saveItemCode,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    syncNow,
    saveContentOverride,
    revertContentOverride,
    refreshContentOverrides,
  };
}
