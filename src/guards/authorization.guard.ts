import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";



export class AuthorizationGuard implements CanActivate {
    constructor(private allowedRoles: Array<string>) {
    }

    canActivate(context: ExecutionContext): boolean {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const user = request['user'];
        const allowed = this.isAthorized(user.roles);
        
        if (allowed) {
            return allowed
        } else {
            throw new UnauthorizedException("Unauthorized Role");
        }
    }


    isAthorized(userRoles: Array<string>): boolean {
        let isAllowed = false;
        userRoles.forEach(role => {
            if (!isAllowed && this.allowedRoles.includes(role)) {
                isAllowed = true;
            }
        })
        return isAllowed;
    }
    
}