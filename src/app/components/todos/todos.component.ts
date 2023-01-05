import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";

import {TodosStore} from "@app/components/todos/store";
import {of} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [
    TodosStore,
  ],
  imports: [
    CommonModule,
  ]
})
export class TodosComponent implements OnInit {
  public readonly todos$ = this._todosStore.todos$;

  constructor(
    private readonly _todosStore: TodosStore
  ) { }

  ngOnInit(): void {
    this.resetMovies();
    this._todosStore.getAllTodo(of(''))
  }

  ngOnDestroy() {
    this.resetMovies();
  }

  resetMovies() {
    // resets the State to empty array 👇
    this._todosStore.setState({todos: [], todo: null});
  }
}
