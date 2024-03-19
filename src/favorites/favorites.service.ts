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

  async addTrackToFavorites(trackId: UUID) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { tracks: { some: { id: trackId } } },
    });

    if (!favorite) {
      await this.prisma.favorite.create({
        data: {
          tracks: {
            connect: { id: trackId },
          },
        },
      });
    } else {
      await this.prisma.favorite.update({
        where: { id: favorite.id },
        data: {
          tracks: {
            connect: { id: trackId },
          },
        },
      });
    }

    // if (this.db.getById(RecordType.TRACK, trackId)) {
    //   this.db[RecordType.FAVORITE].tracks.push(trackId);
    //   return true;
    // }
    // return false;
  }

  addAlbumToFavorites(albumId: UUID) {
    if (this.db.getById(RecordType.ALBUM, albumId)) {
      this.db[RecordType.FAVORITE].albums.push(albumId);
      return true;
    }
    return false;
  }

  addArtistToFavorites(artistId: UUID) {
    if (this.db.getById(RecordType.ARTIST, artistId)) {
      this.db[RecordType.FAVORITE].artists.push(artistId);
      return true;
    }
    return false;
  }

  removeTrackFromFavorites(trackId: UUID) {
    this.db[RecordType.FAVORITE].tracks = this.db[
      RecordType.FAVORITE
    ].tracks.filter((track) => track !== trackId);
  }

  removeAlbumFromFavorites(albumId: UUID) {
    this.db[RecordType.FAVORITE].albums = this.db[
      RecordType.FAVORITE
    ].albums.filter((album) => album !== albumId);
  }

  removeArtistFromFavorites(artistId: UUID) {
    this.db[RecordType.FAVORITE].artists = this.db[
      RecordType.FAVORITE
    ].artists.filter((artist) => artist !== artistId);
  }

  findAll() {
    const { artists, albums, tracks } = this.db[RecordType.FAVORITE];

    return {
      artists: artists.map((id) => this.db.getById(RecordType.ARTIST, id)),
      albums: albums.map((id) => this.db.getById(RecordType.ALBUM, id)),
      tracks: tracks.map((id) => this.db.getById(RecordType.TRACK, id)),
    };
  }
}
