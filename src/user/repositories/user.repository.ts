import { Injectable, Param } from '@nestjs/common';
import { User } from '../schemas/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class UserRepository {
  // This injected model service is created in module.
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async createUser(user: Partial<User>) {
    const newUser = this.userModel(user);
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
}
