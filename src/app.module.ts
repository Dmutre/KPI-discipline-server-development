import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { UserModule } from './api/users/user.module';
import { CategoryModule } from './api/contegories/category.module';
import { RecordModule } from './api/records/record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    UserModule,
    CategoryModule,
    RecordModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
