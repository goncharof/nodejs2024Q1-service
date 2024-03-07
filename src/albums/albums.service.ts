import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { UUID, randomUUID } from 'crypto';

@Injectable()
export class AlbumsService {
  private readonly albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: randomUUID(),
      ...createAlbumDto,
    };
    this.albums.push(album);
    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: UUID) {
    return this.albums.find((album) => album.id === id);
  }

  update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    let album = this.findOne(id);
    if (album) {
      album = { ...album, ...updateAlbumDto };
    }
    return album;
  }

  remove(id: UUID) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.albums.splice(index, 1);
    }
  }
}
