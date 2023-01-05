import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'log-in',
    loadComponent: () => import('./components/login/login.component')
      .then(mod => mod.LoginComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./components/sign-up/sign-up.component')
      .then(mod => mod.SignUpComponent)
  },
  {
    path: '',
    loadComponent: () => import('./components/landing/landing.component')
      .then(mod => mod.LandingComponent)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
