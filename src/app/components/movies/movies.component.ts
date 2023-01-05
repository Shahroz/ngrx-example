import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

import {MoviesState, MoviesStore} from "@app/components/movies/store/movies.store";

@Component({
  standalone: true,
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [
    MoviesStore,
  ],
  imports: [
    CommonModule,
  ]
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies$ = this.moviesStore.movies$;

  constructor(private readonly moviesStore: MoviesStore) { }

  ngOnInit(): void {
    this.resetMovies();
  }

  ngOnDestroy() {
    this.resetMovies();
  }

  resetMovies() {
    // resets the State to empty array 👇
    this.moviesStore.setState({movies: [], userPreferredMoviesIds: [], selectedMovieId: null});
  }

  addMovie(title: string) {
    this.moviesStore.setState((state: MoviesState) => {
      return {
        ...state,
        movies: [...state.movies, {id: new Date().valueOf().toString(), completed: true, title}],
        userPreferredMoviesIds: [...state.userPreferredMoviesIds],
      };
    });
  }
}
