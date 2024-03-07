import { UUID } from 'crypto';

export class User {
  id: UUID;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
