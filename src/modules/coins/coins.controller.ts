import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Post()
  async create(@Body() createCoinDto: CreateCoinDto) {
    return this.coinsService.create(createCoinDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoinDto: UpdateCoinDto) {
    return this.coinsService.update(+id, updateCoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinsService.remove(+id);
  }
}
