import { Controller, Get, Post, Req, Res, Body, Put, Param, Delete, HttpException, BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from "../schemas/user.interface";
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@ApiTags('Users')
@Controller('/v1/users')
@UseGuards(AuthenticationGuard, new AuthorizationGuard(['ADMIN']))
export class UserController {

    constructor(
        private userReposiotry: UserRepository) {
    }

    @Get('/:id')
    async find(@Param("id") id: string): Promise<User> {
        return this.userReposiotry.find(id);
    }

    @Get('/')
    async findAll(): Promise<User[]> {
        return this.userReposiotry.findAll();
    }

    @Put('/:userId')
    async update(@Param("userId") userId: string, @Body() changes: Partial<User>): Promise<User> {
        if (changes._id) {
            throw new BadRequestException("Cupdate id");
        } else {
            return this.userReposiotry.updateUser(userId, changes);
        }
    }

    @Post('/')
    async create(@Body() user: Partial<User>): Promise<User> {
        return this.userReposiotry.createUser(user)
    }

    @Delete('/:id')
    async delete(@Param("id") id: string) {
        return this.userReposiotry.deleteUser(id)
    }
}
