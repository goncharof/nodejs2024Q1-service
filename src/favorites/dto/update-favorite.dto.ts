import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { UUID } from 'node:crypto';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
  readonly artists?: UUID[];
  readonly albums?: UUID[];
  readonly tracks?: UUID[];
}
