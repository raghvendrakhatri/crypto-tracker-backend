import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy,RefreshTokenStrategy } from './strategies';

@Module({
  imports:[TypeOrmModule.forFeature([User]),JwtModule.register({})],
  controllers: [AuthenticationController],
  providers: [AuthenticationService,JwtStrategy,RefreshTokenStrategy]
})
export class AuthenticationModule {}
