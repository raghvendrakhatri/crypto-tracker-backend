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

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[config]
  }),
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configService:ConfigService):TypeOrmModuleOptions => ({
      type:'postgres',
      host:configService.get<string>('database.host'),
      port:configService.get<number>('databse.port'),
      username:configService.get<string>('database.username'),
      password:configService.get<string>('database.password'),
      database:configService.get<string>('databse.type'),
      entities:[__dirname + '/../**/*.entity.{js,ts}'],
      synchronize:false
    })
  })
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
