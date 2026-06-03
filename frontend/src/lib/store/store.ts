import { configureStore } from '@reduxjs/toolkit';

import { authReducer, type AuthState } from './authSlice';
import type { StoredAuthUser } from './authTypes';

const AUTH_STORAGE_KEY = 'railway-controller-auth';

type PersistedAuthState = Pick<AuthState, 'user' | 'isAuthenticated' | 'lastAction'>;

function loadPersistedAuthState(): AuthState | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return undefined;
    }

    const parsed = JSON.parse(raw) as PersistedAuthState;
    if (!parsed.user || !parsed.isAuthenticated) {
      return undefined;
    }

    return {
      user: parsed.user,
      isAuthenticated: true,
      loading: false,
      error: null,
      lastAction: parsed.lastAction ?? null,
    };
  } catch {
    return undefined;
  }
}

const persistedAuthState = loadPersistedAuthState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedAuthState ? { auth: persistedAuthState } : undefined,
});

if (typeof window !== 'undefined') {
  let previousSnapshot = '';

  store.subscribe(() => {
    const { auth } = store.getState();

    if (!auth.isAuthenticated || !auth.user) {
      if (window.localStorage.getItem(AUTH_STORAGE_KEY)) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
      previousSnapshot = '';
      return;
    }

    const payload: PersistedAuthState = {
      user: auth.user as StoredAuthUser,
      isAuthenticated: true,
      lastAction: auth.lastAction,
    };

    const snapshot = JSON.stringify(payload);
    if (snapshot !== previousSnapshot) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, snapshot);
      previousSnapshot = snapshot;
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
