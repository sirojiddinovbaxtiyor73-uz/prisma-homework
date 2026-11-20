import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStudentDto) {
    return this.prisma.student.create({ data: dto });
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student topilmadi');
    return student;
  }

  async update(id: number, dto: UpdateStudentDto) {
    await this.findOne(id);
    return this.prisma.student.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.student.delete({ where: { id } });
  }
}