import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID } from 'node:crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: UUID): Promise<Artist> {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch (error) {
      return undefined;
    }
  }

  async remove(id: UUID) {
    try {
      await this.prisma.artist.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
