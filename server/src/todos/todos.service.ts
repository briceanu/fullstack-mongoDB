import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  create(todo: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({
      data: todo,
    });
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  remove(id: string) {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }

  updateComplete(id: string, complete: boolean) {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: complete,
    });
  }
  updateTodo(id: string, updateTodo: string) {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: updateTodo,
    });
  }
}
