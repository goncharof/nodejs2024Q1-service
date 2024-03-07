import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { UUID, randomUUID } from 'crypto';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: randomUUID(),
      ...createTrackDto,
    };
    this.tracks.push(track);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: UUID) {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto) {
    let track = this.findOne(id);
    if (track) {
      track = { ...track, ...updateTrackDto };
    }
    return track;
  }

  remove(id: UUID) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.tracks.splice(index, 1);
    }
  }
}
