import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DbService, RecordType } from 'src/db/db.service';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  create(createUserDto: CreateUserDto): User {
    const user = new User(createUserDto);
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
      if (updateUserDto.oldPassword !== user.password) {
        return {
          status: StatusCodes.FORBIDDEN,
          message: 'Old password is incorrect',
        };
      }

      user.password = updateUserDto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();

      return {
        status: StatusCodes.OK,
        user,
      };
    }
    return {
      status: StatusCodes.NOT_FOUND,
      message: 'User not found',
    };
  }

  remove(id: UUID) {
    const user = this.findOne(id);
    if (user) {
      this.db[RecordType.USER].splice(
        this.db[RecordType.USER].indexOf(user),
        1,
      );

      return true;
    }

    return false;
  }
}
