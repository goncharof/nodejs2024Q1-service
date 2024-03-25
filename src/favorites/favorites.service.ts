import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'node:crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  favmodel = this.prisma.favorite.findFirst();

  async addToFavorite(type: 'albums' | 'artists' | 'tracks', id: UUID) {
    try {
      await this.prisma.favorite.update({
        where: { id: (await this.favmodel).id },
        data: {
          [type]: {
            connect: { id },
          },
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async removeFromFavorite(type: 'albums' | 'artists' | 'tracks', id: UUID) {
    try {
      await this.prisma.favorite.update({
        where: { id: (await this.favmodel).id },
        data: {
          [type]: {
            disconnect: { id },
          },
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async addTrackToFavorites(id: UUID) {
    return await this.addToFavorite('tracks', id);
  }

  async addAlbumToFavorites(albumId: UUID) {
    return await this.addToFavorite('albums', albumId);
  }

  async addArtistToFavorites(artistId: UUID) {
    return await this.addToFavorite('artists', artistId);
  }

  async removeTrackFromFavorites(trackId: UUID) {
    await this.removeFromFavorite('tracks', trackId);
  }

  async removeAlbumFromFavorites(albumId: UUID) {
    await this.removeFromFavorite('albums', albumId);
  }

  async removeArtistFromFavorites(artistId: UUID) {
    await this.removeFromFavorite('artists', artistId);
  }

  async findAll() {
    return plainToInstance(
      Favorite,
      await this.prisma.favorite.findFirst({
        include: {
          artists: true,
          albums: true,
          tracks: true,
        },
      }),
    );
  }
}
