import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  async getByStoreId(storeId: string) {
    return this.prisma.color.findMany({
      where: {
        storeId: storeId,
      },
    });
  }

  async getById(id: string) {
    const color = this.prisma.color.findUnique({
      where: {
        id: id,
      },
    });

    if (!color) {
      throw new NotFoundException('Цвет не найден');
    }

    return color;
  }

  async create(storeId: string, dto: ColorDto) {
    return this.prisma.color.create({
      data: {
        name: dto.name,
        value: dto.value,
        storeId: storeId,
      },
    });
  }

  async update(id: string, dto: ColorDto) {
    await this.getById(id);

    return this.prisma.color.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        value: dto.value,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.prisma.color.delete({
      where: {
        id: id,
      },
    });
  }
}
