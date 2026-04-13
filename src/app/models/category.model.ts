import { TaskToDo } from "./task.model";

export interface Category {
  id: string;
  name: string;
  tasks: TaskToDo[];
}