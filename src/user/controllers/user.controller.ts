import { Controller, Get, Post, Req, Res, Body, Put, Param } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from "../schemas/user.interface";
import { Request, Response } from 'express';
@Controller('users')
export class UserController {

    constructor(
        private userReposiotry: UserRepository) {
    }

    @Get('/')
    async findAll(): Promise<User[]> {
        return this.userReposiotry.findAll();
    }

    @Put('/:userId')
    async update(@Param() { userId }: {userId: string}, @Body() changes: Partial<User>): Promise<User> {
        console.log(userId);
        return this.userReposiotry.updateUser(userId, changes);
    }

    @Post('/')
    async create(@Body() user: Partial<User>): Promise<User> {
        return this.userReposiotry.createUser(user)
    }
}
