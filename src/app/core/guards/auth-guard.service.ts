import { Injectable } from '@angular/core';
import {
  Router, Route, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, CanLoad
} from '@angular/router';
import {Store} from "@ngrx/store";
import {catchError, filter, map, Observable, of, take, tap} from "rxjs";

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
      map((auth: IAuthState) => Boolean(auth.isAuthenticated)),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          return this.redirectToLoginScreen();
        }
        return of (true);
      }),
      catchError(() => {
        return this.redirectToLoginScreen();
      })
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth$.pipe(
      filter((auth: IAuthState) => auth.isAuthenticated),
      take(1),
      map((auth: IAuthState) => Boolean(auth.isAuthenticated)),
      catchError(() => {
        return this.redirectToLoginScreen();
      })
    );
  }

  private redirectToLoginScreen(): Promise<boolean> {
    return this._router.navigateByUrl('/auth/login');
  }
}
