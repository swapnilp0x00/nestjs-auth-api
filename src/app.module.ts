import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import { MONGO_URL } from './_constants/constants';
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(MONGO_URL, {useFindAndModify: false})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
