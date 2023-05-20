import { Injectable } from '@nestjs/common';
import { CreateUserCoinDto } from './dto/createUserCoin.dto';
import { UpdateUserCoinDto } from './dto/update-user-coin.dto';
import { CoinsService } from '../coins/coins.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCoin } from './entities/user-coin.entity';
import { Repository } from 'typeorm';
import { UserCoinMapping } from '../entities/userCoinMapping.entity';
import { CurrentUserDto } from '../authentication/dto/currentUser.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserCoinsService {

  constructor(
    private readonly coinService:CoinsService,
    @InjectRepository(UserCoinMapping)
    private readonly userCoinRepository:Repository<UserCoinMapping>
  ){}


  async create(user:CurrentUserDto,createUserCoinDto: CreateUserCoinDto) {
    const isCoinExist = await this.coinService.findOne(createUserCoinDto.coinId);
    let coinDetails;
    if(Object.keys(isCoinExist).length === 0){
      coinDetails = await this.coinService.create({id:createUserCoinDto.coinId});
    }
    ///@ts-ignore
    const coinId = isCoinExist.id || coinDetails.id;
    console.log(coinId,isCoinExist,coinDetails)
    const userCoins = await this.userCoinRepository.insert({userId:user.userId,coinId:coinId});  
  }


  @Cron('* */15 * * * *')
  async createAlets(){
    const coins = await this.coinService.findAll();

    for(const coin of coins){
      console.log(coin);
    }

  }

  findAll() {
    return `This action returns all userCoins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCoin`;
  }

  update(id: number, updateUserCoinDto: UpdateUserCoinDto) {
    return `This action updates a #${id} userCoin`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCoin`;
  }
}
