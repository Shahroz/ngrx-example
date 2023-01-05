import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {Observable, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

import {ITodoState} from "@app/components/todos/interfaces/ITodoState";
import {DataService} from "@app/core/services/data.service";
import {ITodo} from "@app/components/todos/interfaces";

@Injectable({
  providedIn: 'root',
})
export class TodosStore extends ComponentStore<ITodoState> {
  public readonly BASE_URL: string = 'https://jsonplaceholder.typicode.com/todos';
  constructor(
    private readonly _dataService: DataService
  ) {
    super({todos: [], todo: null});
  }

  readonly todo$ = this.select(state => state.todo);
  readonly todos$ = this.select(state => state.todos);

  public readonly getAllTodo = this.effect((todos$: Observable<any>) => {
    return todos$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap(() => this._dataService.fetchData({url: this.BASE_URL, method: 'GET'})
        .pipe(
          tapResponse(
            (todos: ITodo[]) => this.patchState({todos}),
            (error: HttpErrorResponse) => this.logError(error),
          )
        ))
    );
  });

  public readonly getTodo = this.effect((todoId$: Observable<number>) => {
    return todoId$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((id: number) => this._dataService.fetchData({url: `${this.BASE_URL}/${id}`, method: 'GET'})
        .pipe(
          tapResponse(
            (todo: ITodo) => this.patchState({todo}),
            (error: HttpErrorResponse) => this.logError(error),
          )
        ))
    );
  });

  private logError(e: HttpErrorResponse): void {
    console.log(e);
  }
}
