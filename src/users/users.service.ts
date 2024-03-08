import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DbService, RecordType } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db[RecordType.USER].push(user);
    return user;
  }

  findAll(): User[] {
    return this.db[RecordType.USER];
  }

  findOne(id: UUID) {
    return this.db[RecordType.USER].find((user) => user.id === id);
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
      this.db[RecordType.USER].splice(
        this.db[RecordType.USER].indexOf(user),
        1,
      );
    }
  }
}
