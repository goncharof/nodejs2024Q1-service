import { Injectable } from '@nestjs/common';
// import { CreateFavoriteDto } from './dto/create-favorite.dto';
// import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { UUID } from 'node:crypto';

@Injectable()
export class FavoritesService {
  private readonly favorite: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  addTrackToFavorites(trackId: UUID) {
    this.favorite.tracks.push(trackId);
  }

  addAlbumToFavorites(albumId: UUID) {
    this.favorite.albums.push(albumId);
  }

  addArtistToFavorites(artistId: UUID) {
    this.favorite.artists.push(artistId);
  }

  removeTrackFromFavorites(trackId: UUID) {
    this.favorite.tracks = this.favorite.tracks.filter(
      (track) => track !== trackId,
    );
  }

  removeAlbumFromFavorites(albumId: UUID) {
    this.favorite.albums = this.favorite.albums.filter(
      (album) => album !== albumId,
    );
  }

  removeArtistFromFavorites(artistId: UUID) {
    this.favorite.artists = this.favorite.artists.filter(
      (artist) => artist !== artistId,
    );
  }

  findAll() {
    return this.favorite;
    //   return `This action returns all favorites`;
  }
}
