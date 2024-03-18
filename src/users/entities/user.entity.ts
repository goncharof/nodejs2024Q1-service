import { Exclude, Transform } from 'class-transformer';
// import { randomUUID } from 'node:crypto';

export class User {
  id: string;
  login: string;
  version: number;
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date;

  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  // constructor({ login, password }: { login: string; password: string }) {
  //   this.id = randomUUID();
  //   this.version = 1;
  //   // this.createdAt = Date.now();
  //   // this.updatedAt = Date.now();
  //   this.login = login;
  //   this.password = password;
  // }
}
