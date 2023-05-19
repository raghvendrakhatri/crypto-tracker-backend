import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities'
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService:ConfigService,
    private readonly jwtService:JwtService,
  ){}

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('jwt.accessTokenSecret'),
          expiresIn: this.configService.get<string>('jwt.accessTokenExpireTime'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('jwt.refreshTokenSecret'),
          expiresIn: this.configService.get<string>('jwt.refreshTokenExpireTime'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }


  async register(createUserDto: CreateUserDto):Promise<Record<string,string>> {
    const rounds = this.configService.get<number>('bcrypt.rounds');
    createUserDto.password = await bcrypt.hash(createUserDto.password, rounds);
    const existingUser = await this.userRepository.findOne({
      where:{
        email:createUserDto.email
      }
    })

    if(existingUser){
      throw new HttpException('not allowed',HttpStatus.NOT_ACCEPTABLE);
    }

    const user = await this.userRepository.save(createUserDto);
    return {message:'User registered successfully'}
  }


  async login(loginUserDto: LoginUserDto):Promise<Record<string,string>> {
    const existingUser = await this.userRepository.findOne({
      where:{
        email:loginUserDto.email
      }
    });

    if(!existingUser){
      throw new HttpException("Please sign up",HttpStatus.BAD_REQUEST);
    }else if(!existingUser.password){
      throw new HttpException("Use another authentication method",HttpStatus.BAD_REQUEST)
    }

    const isValidPassword = bcrypt.compare(existingUser.password,loginUserDto.password);

    if(!isValidPassword){
      throw new HttpException('Invalid username or password',HttpStatus.BAD_REQUEST);
    }

    const payload = {
      username:existingUser.email,
      sub: existingUser.id 
    }

    const tokens = await this.getTokens(existingUser.id,existingUser.email);
    return {
      'accessToken':tokens.accessToken,
      'refreshToken':tokens.refreshToken
    }
  }
}
