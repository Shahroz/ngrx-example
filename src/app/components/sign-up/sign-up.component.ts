import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { IAppState } from '@state/app.state';
import * as AuthActions from "@state/auth/auth.actions";

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignUpComponent {
  public signUpFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private readonly _store: Store<IAppState>
  ) { }

  onSubmit(): void {
    const {valid, value} = this.signUpFormGroup;
    if (valid) {
      this._store.dispatch(
        AuthActions.SignUp({user: value})
      );
    }
  }
}
