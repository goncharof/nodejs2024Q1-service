import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUID } from 'crypto';

// class FindOneParams {
//   @IsUUID('4')
//   id: UUID;
// }

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) trackId: UUID,
  ) {
    return this.favoritesService.addTrackToFavorites(trackId);
  }

  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) albumId: UUID,
  ) {
    return this.favoritesService.addAlbumToFavorites(albumId);
  }

  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: UUID,
  ) {
    return this.favoritesService.addArtistToFavorites(artistId);
  }

  @Get()
  async getAllFavorites() {
    return this.favoritesService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) trackId: UUID,
  ) {
    return this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) albumId: UUID,
  ) {
    return this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: UUID,
  ) {
    return this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
