import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },AppService],
})
export class AppModule {}
