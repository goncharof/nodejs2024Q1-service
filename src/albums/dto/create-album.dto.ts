import { UUID } from 'node:crypto';

export class CreateAlbumDto {
  readonly name: string;
  readonly year: number;
  readonly artistId: UUID | null;
}
