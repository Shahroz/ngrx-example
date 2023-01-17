import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'todos',
        loadComponent: () => import('./todos/todos.component')
          .then(mod => mod.TodosComponent),
      },
      {
        path: 'movies',
        loadComponent: () => import('./movies/movies.component')
          .then(mod => mod.MoviesComponent),
      },
      {
        path: '',
        loadComponent: () => import('./landing/landing.component')
          .then(mod => mod.LandingComponent),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedModule { }
