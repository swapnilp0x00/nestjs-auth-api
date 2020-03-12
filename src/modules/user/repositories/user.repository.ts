import { Injectable, Param, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { User } from '../schemas/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as password from 'password-hash-and-salt';

@Injectable()
export class UserRepository {
  // This injected model service is created in module.
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async find(userId: string): Promise<User> {
      const user = await this.userModel.findById(userId)
      if (!user) {
        throw new NotFoundException("User Not Found");
      }
      return user.toUI()
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async getHash(textPassword: any): Promise<string> {
    return new Promise((resolve, reject) => {
      password(textPassword).hash((error, hash) => {
        if (error) {
          console.log(error);
          reject(new BadRequestException("Bad"))
        } else {
          resolve(hash)
        }
      })
    });
  }

  async createUser(user: Partial<User>) {
    const newUser = this.userModel(user);
    // Add Default Role
    if (newUser.roles.length == 0) {
      newUser.roles = ['User']
    }
    // Hash Password.
    const passwordHash = await this.getHash(newUser.password);
    if (!passwordHash) {
      throw new BadRequestException("bad Request");
    }
    newUser.password = passwordHash;
    await newUser.save();
    return newUser.toUI();
  }

  async updateUser(userId: string, user: Partial<User>) {
    return this.userModel.findOneAndUpdate(
      {
        '_id': userId,
      },
      user,
      { new: true },
    );
  }

  async deleteUser(userId: string) {
    return this.userModel.deleteOne({_id: userId})
  }
}
