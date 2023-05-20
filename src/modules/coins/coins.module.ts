import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coins } from '../entities';

@Module({
  imports:[HttpModule,TypeOrmModule.forFeature([Coins])],
  controllers: [CoinsController],
  providers: [CoinsService]
})
export class CoinsModule {}
