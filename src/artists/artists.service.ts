import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID, randomUUID } from 'crypto';
import { DbService, RecordType } from 'src/db/db.service';

@Injectable()
export class ArtistsService {
  constructor(private db: DbService) {}

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    this.db[RecordType.ARTIST].push(artist);
    return artist;
  }

  findAll() {
    return this.db[RecordType.ARTIST];
  }

  findOne(id: UUID) {
    return this.db[RecordType.ARTIST].find((artist) => artist.id === id);
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    let artist = this.findOne(id);

    console.log(this.findAll(), id);

    if (artist) {
      artist = { ...artist, ...updateArtistDto };
      return artist;
    } else {
      return undefined;
    }
  }

  remove(id: UUID) {
    const index = this.db[RecordType.ARTIST].findIndex(
      (artist) => artist.id === id,
    );
    if (index !== -1) {
      this.db[RecordType.ARTIST].splice(index, 1);

      this.db[RecordType.FAVORITE].artists = this.db[
        RecordType.FAVORITE
      ].artists.filter((artist) => artist !== id);

      this.db[RecordType.ALBUM].forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      });

      this.db[RecordType.TRACK].forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      });

      return true;
    }

    return false;
  }
}
