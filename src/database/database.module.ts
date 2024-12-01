import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CategoryEntity } from './entities/category.entity';
import { RecordEntity } from './entities/record.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('dbHost'),
        port: configService.get<number>('dbPort'),
        username: configService.get<string>('dbUser'),
        password: configService.get<string>('dbPassword'),
        database: configService.get<string>('database'),
        entities: [UserEntity, CategoryEntity, RecordEntity],
        synchronize: true,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
