import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class AuthenticationGuard implements CanActivate {
    
    canActivate(context: ExecutionContext): boolean {
        const http = context.switchToHttp();
        const req = http.getRequest();

        const user = req["user"];
        
        if (!user) {
            throw new UnauthorizedException("No User found");
        }
        
        return true;
    }

}