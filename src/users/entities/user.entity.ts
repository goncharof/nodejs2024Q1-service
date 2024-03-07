import { UUID } from 'node:crypto';

export class User {
  id: UUID;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
