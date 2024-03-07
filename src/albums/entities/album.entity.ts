import { UUID } from 'node:crypto';

export class Album {
  id: UUID;
  name: string;
  year: number;
  artistId: UUID | null;
}
