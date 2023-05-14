import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('test')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Record<string,string> {
    try{
      return this.appService.getHello();
    }catch(error){
      throw new HttpException(error['message'],error['status']);
    }
  }
}
