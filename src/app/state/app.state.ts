import { ActionReducerMap } from '@ngrx/store';

import {IAuthState} from './auth';

import {authReducer} from "./auth/auth.reducer";

export interface IAppState {
  auth: IAuthState,
}

export const reducers: ActionReducerMap<IAppState> = {
  auth: authReducer
};
