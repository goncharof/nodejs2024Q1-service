import { Injectable } from '@nestjs/common';
// import { CreateFavoriteDto } from './dto/create-favorite.dto';
// import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UUID } from 'node:crypto';
import { DbService, RecordType } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  addTrackToFavorites(trackId: UUID) {
    if (this.db.getById(RecordType.TRACK, trackId)) {
      this.db[RecordType.FAVORITE].tracks.push(trackId);
      return true;
    }
    return false;
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
