import { Module } from '@nestjs/common';
import { UserCoinsService } from './userCoins.service';
import { UserCoinsController } from './userCoins.controller';
import { CoinsService } from '../coins/coins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coins } from '../entities';
import { HttpModule } from '@nestjs/axios';
import { UserCoinMapping } from '../entities/userCoinMapping.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Coins,UserCoinMapping]),HttpModule],
  controllers: [UserCoinsController],
  providers: [UserCoinsService,CoinsService]
})
export class UserCoinsModule {}
