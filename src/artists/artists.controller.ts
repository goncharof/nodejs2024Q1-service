import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UUID } from 'crypto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.artistsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.artistsService.remove(id);
  }
}
