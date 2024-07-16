import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  addTodo(newNote: object) {
    localStorage.setItem("todoList", JSON.stringify(newNote));
  }
}
