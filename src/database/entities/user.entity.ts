import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecordEntity } from './record.entity';
import { CategoryEntity } from './category.entity';

@Entity()
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  name: string;

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];

  @OneToMany(() => RecordEntity, (record) => record.user)
  records: RecordEntity[];

  @ApiProperty({ type: Date })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
