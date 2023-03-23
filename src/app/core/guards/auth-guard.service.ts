import { Injectable } from '@angular/core';
import {
  Router, Route, UrlTree, UrlSegment, CanLoad
} from '@angular/router';
import {Store} from "@ngrx/store";
import {catchError, map, Observable, take} from "rxjs";

import {IAuthState} from "@app/state";
import {auth} from "@state/auth/auth.reducer";

@Injectable()
export class AuthGuardService implements CanLoad {
  private readonly auth$ !: Observable<IAuthState>;

  constructor(
    private _router: Router,
    private readonly _store: Store<IAuthState>
  ) {
    this.auth$ = _store.select<IAuthState>(auth);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth$.pipe(
      take(1),
      map((auth: IAuthState) => {
        const isLoggedIn: boolean = Boolean(auth.isAuthenticated);
        if (!isLoggedIn) {
          this._router.navigateByUrl('/auth/login')
            .then()
            .catch();
          return false;
        }
        return true;
      }),
      catchError(() => this.redirectToLoginScreen())
    );
  }

  private redirectToLoginScreen() {
    return this._router.navigateByUrl('/auth/login');
  }
}
