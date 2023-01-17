import {ITodo} from "@app/layout/protected/todos/interfaces/ITodo";

export interface ITodoState {
  todos: ITodo[];
  todo?: ITodo | null
}
