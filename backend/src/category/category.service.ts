import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: data.name!,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        tasks: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    if (category.tasks.length > 0) {
      throw new BadRequestException(
        'Esta categoria não pode ser excluída porque está vinculada a uma ou mais tarefas.',
      );
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}