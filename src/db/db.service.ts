import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

export enum RecordType {
  USER = 'user',
  ALBUM = 'album',
  ARTIST = 'artist',
  TRACK = 'track',
  FAVORITE = 'favorite',
}

@Injectable()
export class DbService {
  private [RecordType.USER]: User[] = [];
  private [RecordType.ALBUM]: Album[] = [];
  private [RecordType.ARTIST]: Artist[] = [];
  private [RecordType.TRACK]: Track[] = [];
  private [RecordType.FAVORITE]: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getById(recordType: RecordType, id: UUID) {
    return (this[recordType] as { id: UUID }[]).find(
      (record) => record.id === id,
    );
  }

  // getAll() {
  //   return Object.values(this.records);
  // }
}
