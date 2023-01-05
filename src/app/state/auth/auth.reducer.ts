import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";

import {IAuthState, initialState} from "@app/state";
import {LogIn, LogOut, SignUp, LogInFailure, LogInSuccess, SignUpFailure, SignUpSuccess} from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(
    LogIn,
    SignUp,
    (state, { user }) => ({ ...state, user, loading: true, loaded: false, isAuthenticated: false, errorMessage: null})
  ),
  on(
    LogOut,
    (state) => ({...state, user: null, isAuthenticated: false, loading: false, loaded: false, errorMessage: null})
  ),
  on(
    LogInSuccess,
    SignUpSuccess,
    (state, { user }) => {
      return { ...state, user, loading: false, loaded: true, isAuthenticated: true, errorMessage: null};
    }
  ),
  on(
    LogInFailure,
    (state, errorMessage) => ({ ...state, loading: false, loaded: true, isAuthenticated: false, errorMessage: errorMessage || 'Incorrect email and/or password.'})
  ),
  on(
    SignUpFailure,
    (state, errorMessage) => ({ ...state, loading: false, loaded: true, isAuthenticated: false, errorMessage: errorMessage || 'That email is already in use.'})
  )
);

// Creating Selectors
export const getAuthState = createFeatureSelector<IAuthState>('auth');

export const auth = createSelector(
  getAuthState,
  (state: IAuthState) => state
);
