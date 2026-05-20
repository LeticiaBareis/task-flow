import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Priority, TaskStatus } from '@prisma/client';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: Priority,
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
  })
  @Get()
  findAll(
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: Priority,
    @Query('category') category?: string,
  ) {
    return this.taskService.findAll({
      status,
      priority,
      category,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.taskService.update(id, body);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateTaskStatusDto) {
    return this.taskService.updateStatus(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}