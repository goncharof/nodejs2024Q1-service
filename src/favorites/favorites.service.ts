import { Injectable } from '@nestjs/common';
// import { CreateFavoriteDto } from './dto/create-favorite.dto';
// import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UUID } from 'node:crypto';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private prisma: PrismaService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

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

  addArtistToFavorites(artistId: UUID) {
    return this.addToFavorite('artists', artistId);
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
    return await this.prisma.favorite.findFirst({
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    // const response = {
    // artists: favorite.artists.map((favArtist) => favArtist.artist),
    // albums: firstFavorite.albums.map((favAlbum) => favAlbum.album),
    // tracks: firstFavorite.tracks.map((favTrack) => favTrack.track),
    // };

    // return response;
  }
}
