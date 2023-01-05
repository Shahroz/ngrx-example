export interface IUser {
  id?: number;
  password?: string;
  name: string | null;
  email: string | null;
  token?: string | null;
  rememberMe?: boolean;
}

export class User implements IUser {
  public id?: number;
  public password?: string;
  public rememberMe?: boolean;
  public name: string | null = null;
  public email: string | null = null;
  public token: string | null = null;

  constructor(values?: IUser) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
