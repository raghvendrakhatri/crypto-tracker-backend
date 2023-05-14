import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      let errorMessage = "Internal Server Error";


      if(exception instanceof HttpException){
            httpStatus = exception.getStatus();
            errorMessage = exception.message;
      }
      
      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        error:errorMessage
      };
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }