import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return new User(await this.prisma.user.create({ data: createUserDto }));
  }

  async findAll(): Promise<User[]> {
    return plainToInstance(User, await this.prisma.user.findMany());
  }

  async findOne(id: UUID): Promise<User> {
    return new User(await this.prisma.user.findUnique({ where: { id } }));
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      if (updateUserDto.oldPassword !== user.password) {
        return {
          status: StatusCodes.FORBIDDEN,
          message: 'Old password is incorrect',
        };
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          password: updateUserDto.newPassword,
          version: user.version + 1,
        },
      });

      return {
        status: StatusCodes.OK,
        user: new User(updatedUser),
      };
    }
    return {
      status: StatusCodes.NOT_FOUND,
      message: 'User not found',
    };
  }

  async remove(id: UUID) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
