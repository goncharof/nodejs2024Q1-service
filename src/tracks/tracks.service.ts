import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { UUID, randomUUID } from 'crypto';
import { DbService, RecordType } from 'src/db/db.service';

@Injectable()
export class TracksService {
  constructor(private db: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: randomUUID(),
      ...createTrackDto,
    };
    this.db[RecordType.TRACK].push(track);
    return track;
  }

  findAll() {
    return this.db[RecordType.TRACK];
  }

  findOne(id: UUID) {
    return this.db[RecordType.TRACK].find((track) => track.id === id);
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto) {
    let track = this.findOne(id);
    if (track) {
      track = { ...track, ...updateTrackDto };
    }
    return track;
  }

  remove(id: UUID) {
    const index = this.db[RecordType.TRACK].findIndex(
      (track) => track.id === id,
    );
    if (index !== -1) {
      this.db[RecordType.TRACK].splice(index, 1);

      this.db[RecordType.FAVORITE].tracks = this.db[
        RecordType.FAVORITE
      ].tracks.filter((track) => track !== id);
    }
  }
}
