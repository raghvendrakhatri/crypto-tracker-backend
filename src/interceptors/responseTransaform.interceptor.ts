import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformationInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => ({ 
            data: data,
            statusCode: context.switchToHttp().getResponse().statusCode,
            path: context.switchToHttp().getRequest().url,
            timeStamp: new Date().toISOString(),
            message: "Success"
        })));
    }
}