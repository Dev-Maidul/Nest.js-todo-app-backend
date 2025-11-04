import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  getTodo(@Param('id') id: string): Todo {
    const todo = this.todoService.findOne(parseInt(id));
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Post()
  createTodo(@Body() todoData: Omit<Todo, 'id' | 'createdAt'>): Todo {
    return this.todoService.create(todoData);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updateData: Partial<Todo>,
  ): Todo {
    const updatedTodo = this.todoService.update(parseInt(id), updateData);
    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }
    return updatedTodo;
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): { success: boolean } {
    const success = this.todoService.delete(parseInt(id));
    if (!success) {
      throw new NotFoundException('Todo not found');
    }
    return { success };
  }
}
