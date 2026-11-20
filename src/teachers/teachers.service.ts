import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTeacherDto) {
    return this.prisma.teacher.create({ data: dto });
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher topilmadi');
    return teacher;
  }

  async update(id: number, dto: UpdateTeacherDto) {
    await this.findOne(id);
    return this.prisma.teacher.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.teacher.delete({ where: { id } });
  }
}