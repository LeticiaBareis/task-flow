import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Priority, TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ example: 'Estudar NestJS' })
  title: string | undefined;

  @ApiPropertyOptional({ example: 'Criar CRUD de tarefas' })
  description?: string;

  @ApiPropertyOptional({ example: '2026-05-20T10:00:00.000Z' })
  dueDate?: string;

  @ApiPropertyOptional({ enum: Priority, example: Priority.MEDIUM })
  priority?: Priority;

  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.PENDING })
  status?: TaskStatus;

  @ApiProperty({ example: 'uuid-do-usuario' })
  userId: string | undefined;

  @ApiPropertyOptional({
    example: ['uuid-da-categoria'],
    type: [String],
  })
  categoryIds?: string[];
}