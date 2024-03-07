import { UUID } from 'node:crypto';

export class Favorite {
  artists: UUID[];
  albums: UUID[];
  tracks: UUID[];
}
