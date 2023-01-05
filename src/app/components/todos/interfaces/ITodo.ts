export interface ITodo {
  id?: number;
  userId?: number | null;
  title: string | null;
  completed: boolean;
}
