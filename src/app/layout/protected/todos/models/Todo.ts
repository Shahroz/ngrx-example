import {ITodo} from '../interfaces';

export class Todo implements ITodo {
  public id?: number;
  public userId?: number;
  public title: string | null = null;
  public completed: boolean = false;

  constructor(value?: Todo) {
    if (value && Object.keys(value).length) {
      Object.assign(this, value);
    }
  }
}
