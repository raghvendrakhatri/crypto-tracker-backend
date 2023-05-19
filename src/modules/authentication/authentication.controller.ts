import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Logger, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto,LoginUserDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser,RefreshToken } from './decorators';
import { User } from '../entities';
import { CurrentUserDto } from './dto/currentUser.dto';
import { JwtAuthGuard, RefreshTokenAuthGuard } from './guards';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto):Promise<Record<string,string>> {
    try{
      const user = await this.authenticationService.register(createUserDto);
      return user;
    }catch(error){
      Logger.log(error);
      throw new HttpException(error['message'],error['status']);
    }
  } 


  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto):Promise<Record<string,string>>{
    try{
      return this.authenticationService.login(loginUserDto);
    }catch(error){
      Logger.log(error);
      throw new HttpException(error['message'],error['status']);
    }
  }


  // @ApiBearerAuth()
  @UseGuards(RefreshTokenAuthGuard)
  @Get()
  async loggedIn(@RefreshToken() refresh:any){
    return refresh
  }
}
