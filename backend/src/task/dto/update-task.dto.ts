import { ApiPropertyOptional } from '@nestjs/swagger';
import { Priority } from '@prisma/client';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Estudar Prisma' })
  title?: string;

  @ApiPropertyOptional({ example: 'Atualizar tarefa no backend' })
  description?: string;

  @ApiPropertyOptional({ example: '2026-05-20T10:00:00.000Z' })
  dueDate?: string;

  @ApiPropertyOptional({ enum: Priority, example: Priority.HIGH })
  priority?: Priority;

  @ApiPropertyOptional({
    example: ['uuid-da-categoria'],
    type: [String],
  })
  categoryIds?: string[];
}