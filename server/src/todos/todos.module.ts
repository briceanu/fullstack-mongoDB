import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma/prisma.module';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [PrismaModule], // import the prisma module here
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
