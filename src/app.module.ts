import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './_constants/constants';
import { GetUserMiddleware } from './middlewares/get-user.middleware';
import { UserController } from './modules/user/controllers/user.controller';
import { UserSchema } from './modules/user/schemas/user.schama';
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(UserController)
  }

}
