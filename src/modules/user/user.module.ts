import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schama';
import { UserRepository } from './repositories/user.repository';
import { GetUserMiddleware } from 'src/middlewares/get-user.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserRepository, GetUserMiddleware]
})
export class UserModule {}
