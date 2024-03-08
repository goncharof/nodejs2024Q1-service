import { Exclude } from 'class-transformer';
import { UUID } from 'node:crypto';

export class User {
  id: UUID;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
