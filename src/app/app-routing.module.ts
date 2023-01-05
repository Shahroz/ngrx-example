import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "@app/core/guards/auth-guard.service";

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
    path: 'todos',
    loadComponent: () => import('./components/todos/todos.component')
      .then(mod => mod.TodosComponent),
    canLoad: [AuthGuardService],
  },
  {
    path: 'movies',
    loadComponent: () => import('./components/movies/movies.component')
      .then(mod => mod.MoviesComponent),
    canLoad: [AuthGuardService],
  },
  {
    path: '',
    loadComponent: () => import('./components/landing/landing.component')
      .then(mod => mod.LandingComponent),
    canLoad: [AuthGuardService],
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
  ]
})
export class AppRoutingModule { }
