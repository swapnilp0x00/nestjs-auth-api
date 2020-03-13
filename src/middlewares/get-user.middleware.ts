import { Injectable, NestMiddleware, BadRequestException } from "@nestjs/common";
import { JWTSecret } from "src/_constants/constants";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
    
    use(req: Request, res: Response, next: () => void) {
        const authToken = req.headers['authorization'];
        if (!authToken) {
            console.log('No Token');
            next();
            return;
            // throw new BadRequestException("No Auth Token found");
        }

        try {
            const user = jwt.verify(authToken, JWTSecret);
            if (user) {
                console.log('User');
                console.log(user);
                req['user'] = user;
            }
        } catch (error) {
            console.log('Error handling authentication JWT', error);
        }
        next();
        // This middleware will only try to set user and then pass to next.
        // User existence will be checked by guard. 
    }
}