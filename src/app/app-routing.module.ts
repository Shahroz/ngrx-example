import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnauthGuardService} from "@app/core/guards/unauth-guard.service";
import {AuthGuardService} from "@app/core/guards/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./layout/protected/protected.module')
      .then(mod => mod.ProtectedModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'auth',
    loadChildren: () => import('./layout/auth/auth.module')
      .then(mod => mod.AuthModule),
    canLoad: [UnauthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabledBlocking',
  })],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    UnauthGuardService,
  ]
})
export class AppRoutingModule { }
