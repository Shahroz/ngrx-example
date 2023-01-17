import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { localStorageSync } from 'ngrx-store-localstorage';
import {StoreModule, ActionReducer, MetaReducer, Action} from '@ngrx/store';
import {merge} from "lodash";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {IAuthState} from "@app/state";
import { reducers } from '@state/app.state';
import { AuthEffects } from '@state/auth/auth.effects';
import { AuthService } from './core/services/auth.service';
import {DataService} from "@app/core/services/data.service";

import {AUTH_STORE_KEY_PREFIX} from "@app/core/constants/app-contants";

const INIT_ACTION = "@ngrx/store/init";
const UPDATE_ACTION = "@ngrx/store/update-reducers";

const mergeReducer = (state: IAuthState, rehydratedState: IAuthState, action: Action): IAuthState => {
  if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION) && rehydratedState) {
    state = merge(state, rehydratedState);
  }/* else if (action.type === AuthActions.AuthActionTypes.LOGOUT) {
    state = {...state, user: null, isAuthenticated: false, loaded: false, loading: false, errorMessage: null};
  }*/
  return state;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true,
    storageKeySerializer: (key) => `${AUTH_STORE_KEY_PREFIX}_${key}`,
    mergeReducer: mergeReducer,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(
      reducers,
      {metaReducers}
    ),
    EffectsModule.forRoot([AuthEffects]),
    AppRoutingModule,
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
