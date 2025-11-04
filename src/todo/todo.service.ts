import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(todoData: Omit<Todo, 'id' | 'createdAt'>): Todo {
    const newTodo: Todo = {
      id: this.idCounter++,
      ...todoData,
      createdAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateData: Partial<Todo>): Todo | null {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return null;

    this.todos[todoIndex] = { ...this.todos[todoIndex], ...updateData };
    return this.todos[todoIndex];
  }

  delete(id: number): boolean {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return false;

    this.todos.splice(todoIndex, 1);
    return true;
  }
}
