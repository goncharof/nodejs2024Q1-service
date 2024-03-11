import { Exclude } from 'class-transformer';
import { UUID, randomUUID } from 'node:crypto';

export class User {
  id: UUID;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor({ login, password }: { login: string; password: string }) {
    this.id = randomUUID();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.login = login;
    this.password = password;
  }
}
