import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Todo {
  newTitle: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent implements OnInit{
  title: string = '';
  getTodoList: any;
  selectedTitle: string = '';
  todos: Todo[] = [];
  idx: number = 0;
  completedTask: Todo[] = [];
  constructor(
    private toDoServive: TodoService
  ) {}
  ngOnInit(): void {
  }

  onAddClick(): void {
    if (this.title.trim().length === 0) {
      return;
    }
    this.todos.push({
      newTitle: this.title,
      completed: false
    });
    this.title = '';
    this.toDoServive.addTodo(this.todos);
  }

  onStatusChange(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
    localStorage.setItem("todoList", JSON.stringify(this.todos));
    this.selectedTitle = this.todos[index].newTitle.trim().toLowerCase();
    if (this.todos[index].completed) {
      this.completedTask.push(this.todos[index]);
    } else {
      const idx = this.completedTask.findIndex((x) => x.newTitle.trim().toLowerCase() === this.selectedTitle);
      this.completedTask.splice(idx, 1);
    }
  }

  onDelete(index: number) {
    this.getTodoList = JSON.parse(localStorage.getItem("todoList") || '{}');
    this.getTodoList.splice(index,1);
    localStorage.setItem("todoList",JSON.stringify(this.getTodoList));
    this.todos = this.getTodoList;
  }
}
