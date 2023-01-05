import {ITodo} from "@app/components/todos/interfaces/ITodo";

export interface ITodoState {
  todos: ITodo[];
  todo?: ITodo | null
}
