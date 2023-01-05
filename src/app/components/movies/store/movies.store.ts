import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";

import {DataService} from "@app/core/services/data.service";

export interface Movie {
  id: string;
  userId?: number;
  title?: string;
  completed?: boolean;
}

export interface MoviesState {
  movies: Movie[];
  userPreferredMoviesIds: string[];
  selectedMovieId?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesStore extends ComponentStore<MoviesState> {
  public readonly BASE_API_URL: string = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private readonly _dataService: DataService) {
    super({movies: [], userPreferredMoviesIds:[]});
  }

  readonly movies$: Observable<Movie[]> = this.select(state => state.movies);
  readonly userPreferredMovieIds$ = this.select(state => state.userPreferredMoviesIds);

  readonly userPreferredMovies$ = this.select(
    this.movies$,
    this.userPreferredMovieIds$,
    (movies, ids) => movies.filter(movie => ids.includes(movie.id))
  );

  readonly addMovie = this.updater((state: MoviesState, movie: Movie) => ({
    movies: [...state.movies, movie],
    userPreferredMoviesIds: [...state.userPreferredMoviesIds],
  }));

  // Each new call of getMovie(id) pushed that id into movieId$ stream.
  readonly getAllMovie = this.effect((movies$: Observable<any>) => {
    return movies$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap(() => this.fetchMovie().pipe(
        //👇 Act on the result within inner pipe.
        tap({
          next: (movies: Movie[]) => this.patchState({movies}),
          error: (e) => this.logError(e),
        }),
        // 👇 Handle potential error within inner pipe.
        catchError(() => EMPTY),
      )),
    );
  });

  // Each new call of getMovie(id) pushed that id into movieId$ stream.
  readonly getMovie = this.effect((movieId$: Observable<string>) => {
    return movieId$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((id) => this.fetchMovie(id).pipe(
        //👇 Act on the result within inner pipe.
        tap({
          next: (movie: Movie) => this.addMovie(movie),
          error: (e) => this.logError(e),
        }),
        // 👇 Handle potential error within inner pipe.
        catchError(() => EMPTY),
      )),
    );
  });

  public fetchMovie(id?: string): Observable<any> {
    return this._dataService.fetchData({
      url: `${this.BASE_API_URL}/${id}`,
      method: 'GET'
    });
  }

  private logError(e: any): void {}
}
