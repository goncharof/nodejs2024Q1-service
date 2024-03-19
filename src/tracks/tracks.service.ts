import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: UUID): Promise<Track> {
    return await this.prisma.track.findUnique({ where: { id } });
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto) {
    try {
      return this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (error) {
      return undefined;
    }
  }

  remove(id: UUID) {
    try {
      this.prisma.track.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
