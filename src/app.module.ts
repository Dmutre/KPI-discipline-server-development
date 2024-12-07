import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { UserModule } from './api/users/user.module';
import { CategoryModule } from './api/categories/category.module';
import { RecordModule } from './api/records/record.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
    UserModule,
    CategoryModule,
    RecordModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
