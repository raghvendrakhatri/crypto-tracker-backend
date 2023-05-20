import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coins } from '../entities';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CoinsService {

  constructor(
    @InjectRepository(Coins)
    private readonly coinRespository:Repository<Coins>,
    private readonly httpService:HttpService,
    private readonly configService:ConfigService
  ){}


  async fetchCoinById(coindId:string){
    const url = this.configService.get<string>('url.coinApi') + coindId;
    const response = await axios({
      method: 'GET',
      url,
    }).catch(() => {
      throw new ForbiddenException('API not available');
    });

    return  response.data;
  }



  async create(payload : CreateCoinDto) {
    const coinDetials = await this.fetchCoinById(payload.id);

    const coinsPayload = {
      coinName:coinDetials.name,
      coinPrice: coinDetials.market_data.current_price.inr,
      coinSymbol:coinDetials.symbol,
      coinImage:coinDetials.image.small,
      coinWebId:payload.id
    }

    const coinExist = await this.findOne(coinsPayload.coinWebId);
    if(Object.keys(coinExist).length > 0){
      return coinExist;
    }

    const coinCreated = await this.coinRespository.save(coinsPayload);
    return coinCreated;
  }

  async findAll():Promise<any> {
    const coins = await this.coinRespository.find({});
    return coins || [];
  }

  async findOne(coinId: string) {
   const coin = await this.coinRespository.findOne({where:{coinId:coinId}});
   return coin || {};
  }

  update(id: number, updateCoinDto: UpdateCoinDto) {
    return `This action updates a #${id} coin`;
  }

  remove(id: number) {
    return `This action removes a #${id} coin`;
  
  }

}
