import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { User } from '../../user/schemas/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import { JWTSecret, AccessTokenValidity, RefresTokenValidity } from 'src/_constants/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/v1/auth')
export class AuthController {
    
    constructor(@InjectModel('User') private userModel: Model<User>) {

    }

    async validatePassword(textPassword: string, hash: string) {
        return new Promise((resolve, reject) => {
            password(textPassword).verifyAgainst(
                hash,
                (error, verified) => {
                    if (!verified || error) {
                        reject(new UnauthorizedException("Password wrong"));
                    } else {
                        resolve(true)
                    }
                }
            )
        });
    }

    async generateAccessToken(user): Promise<string> {
        const authToken = jwt.sign({
            email: user.email,
        }, JWTSecret, {
            expiresIn: AccessTokenValidity
        });

        return authToken;
    }

    async generateRefreshToken(user): Promise<string> {
        const authToken = jwt.sign({
            email: user.email
        }, JWTSecret, {
            expiresIn: RefresTokenValidity
        });
        return authToken;
    }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') textPassword: string): Promise<any> {
        const user = await this.userModel.findOne({email: email});

        if (!user) {
            throw new UnauthorizedException("No User Found");
        }
        const validatePassword = await this.validatePassword(textPassword, user.password);
        if (validatePassword) {
            const authToken = await this.generateAccessToken(user);
            const refreshToken = await this.generateRefreshToken(user);
            return {
                'accessToken': authToken,
                'refreshToken': refreshToken
            };
        } else {
            throw new UnauthorizedException("Invalid Password");
        }
    }


    @Post('refresh')
    async refresh(@Body('email') email: string, @Body('password') textPassword: string): Promise<any> {
        const user = await this.userModel.findOne({email: email});

        if (!user) {
            throw new UnauthorizedException("No User Found");
        }
        const validatePassword = await this.validatePassword(textPassword, user.password);
        if (validatePassword) {
            const authToken = await this.generateAccessToken(user);
            const refreshToken = await this.generateRefreshToken(user);
            return {
                'accessToken': authToken,
                'refreshToken': refreshToken
            };
        } else {
            throw new UnauthorizedException("Invalid Password");
        }
    }
}
