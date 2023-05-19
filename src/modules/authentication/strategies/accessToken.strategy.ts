import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(
    private readonly configService:ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
      super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.get<string>('jwt.accessTokenSecret')
      });
  }

  async validate(payload: any) {
    const existingUser = await this.userRepository.find({
        where:{
            email:payload.username
        }
    });

    if(!existingUser){
        return false;
    }

    return { userId: payload.sub, email: payload.username };
  }
}