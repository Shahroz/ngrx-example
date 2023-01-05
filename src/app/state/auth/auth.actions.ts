import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  SIGNUP = '[Auth] Signup',
  LOGOUT = '[Auth] Logout',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failed',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failed',
}

export const LogOut = createAction(AuthActionTypes.LOGOUT);
export const LogIn = createAction(AuthActionTypes.LOGIN, props<{user: any}>());
export const SignUp = createAction(AuthActionTypes.SIGNUP, props<{user: any}>());
export const LogInFailure = createAction(AuthActionTypes.LOGIN_FAILURE);
export const SignUpFailure = createAction(AuthActionTypes.SIGNUP_FAILURE);
export const LogInSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS, props<{user: any}>());
export const SignUpSuccess = createAction(AuthActionTypes.SIGNUP_SUCCESS, props<{user: any}>());
