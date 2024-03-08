import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { UUID, randomUUID } from 'crypto';
import { DbService, RecordType } from 'src/db/db.service';

@Injectable()
export class AlbumsService {
  constructor(private db: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: randomUUID(),
      ...createAlbumDto,
    };
    this.db[RecordType.ALBUM].push(album);
    return album;
  }

  findAll() {
    return this.db[RecordType.ALBUM];
  }

  findOne(id: UUID) {
    return this.db[RecordType.ALBUM].find((album) => album.id === id);
  }

  update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    let album = this.findOne(id);
    if (album) {
      album = { ...album, ...updateAlbumDto };
    }
    return album;
  }

  remove(id: UUID) {
    const index = this.db[RecordType.ALBUM].findIndex(
      (album) => album.id === id,
    );
    if (index !== -1) {
      this.db[RecordType.ALBUM].splice(index, 1);

      this.db[RecordType.FAVORITE].albums = this.db[
        RecordType.FAVORITE
      ].albums.filter((album) => album !== id);
    }
  }
}
