import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Priority, TaskStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeStatus(status?: string): TaskStatus | undefined {
    if (!status) return undefined;

    const normalized = status.toUpperCase() as TaskStatus;

    if (!Object.values(TaskStatus).includes(normalized)) {
      throw new BadRequestException(
        'Status inválido. Use: PENDING, IN_PROGRESS ou DONE',
      );
    }

    return normalized;
  }

  private normalizePriority(priority?: string): Priority | undefined {
    if (!priority) return undefined;

    const normalized = priority.toUpperCase() as Priority;

    if (!Object.values(Priority).includes(normalized)) {
      throw new BadRequestException(
        'Prioridade inválida. Use: LOW, MEDIUM ou HIGH',
      );
    }

    return normalized;
  }

  async create(data: CreateTaskDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.task.create({
      data: {
        title: data.title || 'Sem título',
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        priority: data.priority,
        status: data.status,
        user: {
          connect: { id: data.userId },
        },
        categories: data.categoryIds?.length
          ? {
              connect: data.categoryIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        user: true,
        categories: true,
      },
    });
  }

  findAll(filters: {
    status?: string;
    priority?: string;
    category?: string;
  }) {
    const status = this.normalizeStatus(filters.status);
    const priority = this.normalizePriority(filters.priority);
    const category = filters.category?.trim();

    return this.prisma.task.findMany({
      where: {
        status,
        priority,
        categories: category
          ? {
              some: {
                name: {
                  equals: category,
                  mode: 'insensitive',
                },
              },
            }
          : undefined,
      },
      include: {
        user: true,
        categories: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        user: true,
        categories: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  async update(id: string, data: UpdateTaskDto) {
    await this.findOne(id);

    return this.prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        priority: data.priority,
        categories: data.categoryIds
          ? {
              set: data.categoryIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        user: true,
        categories: true,
      },
    });
  }

  async updateStatus(id: string, data: UpdateTaskStatusDto) {
    await this.findOne(id);

    const status = this.normalizeStatus(data.status);

    return this.prisma.task.update({
      where: { id },
      data: {
        status,
      },
      include: {
        user: true,
        categories: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}