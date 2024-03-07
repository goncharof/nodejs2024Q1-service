import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID, randomUUID } from 'crypto';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    this.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: UUID) {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    let artist = this.findOne(id);
    if (artist) {
      artist = { ...artist, ...updateArtistDto };
    }
    return artist;
  }

  remove(id: UUID) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.artists.splice(index, 1);
    }
  }
}
