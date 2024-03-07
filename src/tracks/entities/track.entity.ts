import { UUID } from 'node:crypto';

export class Track {
  id: UUID;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
