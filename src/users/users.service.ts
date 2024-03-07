import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: UUID) {
    return this.users.find((user) => user.id === id);
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      user.password = updateUserDto.password;
      user.version += 1;
      user.updatedAt = Date.now();
    }
    return user;
  }

  remove(id: UUID) {
    const user = this.findOne(id);
    if (user) {
      this.users.splice(this.users.indexOf(user), 1);
    }
  }
}
