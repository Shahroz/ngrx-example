import { User } from 'src/app/models/User';

export interface IAuthState {
  // the authenticated user
  user: User | null;
  // true if we have attempted existing auth session
  loaded: boolean;
  // true when loading
  loading: boolean;
  // boolean if user is authenticated
  isAuthenticated: boolean;
  // error message
  errorMessage?: any;
}

export const initialState: IAuthState = {
  user: {
    name: null,
    email: null,
    token: null,
  },
  loaded: false,
  loading: false,
  errorMessage: null,
  isAuthenticated: false,
};
