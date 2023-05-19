import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/allException.filter';
import { TransformationInterceptor } from './interceptors/responseTransaform.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { config } from './modules/config/config';
import { TypeOrmModule,TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { dataSourceOptions } from '../typeorm.config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[config]
  }),
  TypeOrmModule.forRoot(dataSourceOptions),
  AuthenticationModule,
  UsersModule
],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformationInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  AppService],
})
export class AppModule {}
