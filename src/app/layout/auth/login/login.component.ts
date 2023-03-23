import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Observable} from "rxjs";

import {IAuthState} from "@app/state";
import {IAppState} from '@state/app.state';
import {auth} from "@state/auth/auth.reducer";
import * as AuthActions from '@state/auth/auth.actions';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
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

  public auth$ !: Observable<IAuthState>;

  constructor(
    private readonly _store: Store<IAppState>
  ) {
    this.auth$ = _store.select<IAuthState>(auth);
  }

  onSubmit(): void {
    const {valid, value} = this.loginFormGroup;
    if (valid) {
      this._store.dispatch(
        AuthActions.LogIn({user: value})
      );
    }
  }
}
