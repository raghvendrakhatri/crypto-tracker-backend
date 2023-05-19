import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({path:'../.env'})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('app.PORT');
  const HOST = configService.get<string>('app.HOST')
  
  const config = new DocumentBuilder().setTitle('Demo Application')
  .setDescription("Demo API Application")
  .setVersion('v1')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT,()=>{
    Logger.log(`Application is running on ${HOST}:${PORT}`)
  });
}
bootstrap();
