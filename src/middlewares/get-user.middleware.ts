import { Injectable, NestMiddleware, BadRequestException } from "@nestjs/common";
import { JWTSecret } from "src/_constants/constants";
import * as jwt from 'jsonwebtoken';
import { InjectModel } from "@nestjs/mongoose";
import { User } from '../modules/user/schemas/user.interface';
import { Model } from 'mongoose';


@Injectable()
export class GetUserMiddleware implements NestMiddleware {

    constructor(@InjectModel('User') private userModel: Model<User>) {
    }
    
    use(req: Request, res: Response, next: () => void) {
        const authToken = req.headers['authorization'];
        if (!authToken) {
            throw new BadRequestException("Token Missing");
            // throw new BadRequestException("No Auth Token found");
        }

        try {
            // This throws error if failed so captured and thrown again.
            const storedUser = jwt.verify(authToken, JWTSecret);
            if (storedUser) {
                this.userModel.findOne({email: storedUser.email}).then(user => {
                    req['user'] = user.toUI();
                    next();
                })
            }
        } catch (error) {
            if (error.expiredAt) {
                throw new BadRequestException({message: "Token Expired", type: 'TokenExpired'});
            } else {
                throw new BadRequestException({ message: "Invalid Token", type: 'TokenInvalid'});
            }
        }
    }
}