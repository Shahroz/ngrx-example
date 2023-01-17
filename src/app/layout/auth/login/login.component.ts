import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {IAppState} from '@state/app.state';
import * as AuthActions from '@state/auth/auth.actions';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  public loginFormGroup: FormGroup = new FormGroup({
    rememberMe: new FormControl(true),
    password: new FormControl('123456', [Validators.required]),
    email: new FormControl('shah.cust1@thyatech.com', [Validators.required, Validators.email]),
  });

  constructor(
    private readonly _store: Store<IAppState>
  ) { }

  onSubmit(): void {
    const {valid, value} = this.loginFormGroup;
    if (valid) {
      this._store.dispatch(
        AuthActions.LogIn({user: value})
      );
    }
  }
}
