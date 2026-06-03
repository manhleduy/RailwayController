import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthAction, StoredAuthUser } from './authTypes';

export interface AuthState {
  user: StoredAuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  lastAction: AuthAction | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  lastAction: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(
      state,
      action: PayloadAction<{ user: StoredAuthUser; lastAction: AuthAction }>
    ) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.lastAction = action.payload.lastAction;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuth() {
      return initialState;
    },
  },
});

export const { authStart, authSuccess, authFailure, clearAuth } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

