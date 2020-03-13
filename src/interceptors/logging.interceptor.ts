import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();
        console.log('Inside Interceptor');
        console.log('request');
        console.log('response', response);
        return next.handle();
    }
    
}