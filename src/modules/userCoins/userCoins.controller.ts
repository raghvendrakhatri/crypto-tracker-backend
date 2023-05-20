import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserCoinsService } from './userCoins.service';
import { CreateUserCoinDto } from './dto/createUserCoin.dto';
import { UpdateUserCoinDto } from './dto/update-user-coin.dto';
import { CurrentUser } from '../authentication/decorators';
import { CurrentUserDto } from '../authentication/dto/currentUser.dto';
import { JwtAuthGuard } from '../authentication/guards';

@UseGuards(JwtAuthGuard)
@Controller('user-coins')
export class UserCoinsController {
  constructor(private readonly userCoinsService: UserCoinsService) {}

  @Post()
  async create(@CurrentUser() user:CurrentUserDto,@Body() createUserCoinDto: CreateUserCoinDto) {
    return this.userCoinsService.create(user,createUserCoinDto);
  }
  
}
