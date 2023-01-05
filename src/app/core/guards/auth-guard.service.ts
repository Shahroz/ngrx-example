import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Store} from "@ngrx/store";
import {catchError, filter, map, Observable, of, take} from "rxjs";

import {IAuthState} from "@app/state";
import {auth} from "@state/auth/auth.reducer";

@Injectable({ providedIn: 'root' })
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
      filter((auth: IAuthState) => auth.isAuthenticated),
      take(1),
      map((auth: IAuthState) => auth.isAuthenticated),
      catchError(() => {
        this._router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
