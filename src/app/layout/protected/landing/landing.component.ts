import { RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {IAuthState} from "@app/state";
import {auth} from "@state/auth/auth.reducer";
import * as AuthActions from '@state/auth/auth.actions';

@Component({
  standalone: true,
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  imports: [
    RouterModule,
    CommonModule,
  ],
})
export class LandingComponent {
  public auth$ !: Observable<IAuthState>;

  constructor(
    private readonly _store: Store<IAuthState>
  ) {
    this.auth$ = _store.select<IAuthState>(auth);
  }

  logOut(): void {
    this._store.dispatch(
      AuthActions.LogOut()
    )
  }
}
