import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from '../dto/currentUser.dto';


export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext):CurrentUserDto => {
    const req = context.switchToHttp().getRequest();
    return req.user as CurrentUserDto;
  },
);