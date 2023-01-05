import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, map, mergeMap, of, tap} from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '@app/core/services/auth.service';
import {IApiResponse} from "@app/core/interfaces/IApiResponse";
import {AuthActionTypes, LogOut, LogInSuccess, LogInFailure, SignUpSuccess, SignUpFailure} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions: Actions,
    private authService: AuthService,
  ) {}

  login$ = createEffect(() => this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN),
      mergeMap((payload: any) => this.authService.logIn(payload.user)
        .pipe(
          map((res: IApiResponse) => {
            return LogInSuccess({user: res.body});
          }),
          tap(() => {
            this.router.navigateByUrl('/landing');
          }),
          catchError((err: any) => of(LogInFailure())),
        )
      )
    )
  );

  signUp$ = createEffect(() => this.actions
    .pipe(
      ofType(AuthActionTypes.SIGNUP),
      mergeMap((payload: any) => this.authService.signUp(payload.user)
        .pipe(
          map(user => SignUpSuccess({user})),
          tap(() => this.router.navigateByUrl('/landing')),
          catchError((err: any) => of(SignUpFailure())),
          //map(user => ({type: AuthActionTypes.SIGNUP_SUCCESS, payload: user})),
          //catchError((err: any) => of({type: AuthActionTypes.SIGNUP_FAILURE}))
        )
      )
    )
  );

  logOut$ = createEffect(() => this.actions
    .pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap((action: AuthActionTypes.LOGOUT) => this.router.navigateByUrl('/login')),
      map(() => { return {type: 'NO_ACTION'}; })
    )
  );
}
