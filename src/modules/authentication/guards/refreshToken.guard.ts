import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class RefreshTokenAuthGuard extends AuthGuard('jwt-refresh') {
    canActivate(context: ExecutionContext) {
      // Add your custom authentication logic here
      // for example, call super.logIn(request) to establish a session.
      console.log('ckhsdcbkbk')
      return super.canActivate(context);
    }
  
    handleRequest(err, payload, info) {
      // You can throw an exception based on either "info" or "err" arguments
      if (err || !payload) {
        throw err || new UnauthorizedException();
      }
      return payload;
    }
  }