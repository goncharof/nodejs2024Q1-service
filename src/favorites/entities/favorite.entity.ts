import { Exclude } from 'class-transformer';
import { UUID } from 'node:crypto';

export class Favorite {
  @Exclude()
  id: UUID;

  artists: UUID[];
  albums: UUID[];
  tracks: UUID[];
}
