import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { UserModule } from './api/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
