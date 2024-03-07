import { Injectable } from '@nestjs/common';
// import { CreateFavoriteDto } from './dto/create-favorite.dto';
// import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private readonly favorite: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };
  // create(createFavoriteDto: CreateFavoriteDto) {
  // return 'This action adds a new favorite';
  // }

  // findAll() {
  //   return `This action returns all favorites`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} favorite`;
  // }

  // update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
  //   return `This action updates a #${id} favorite`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} favorite`;
  // }
}
