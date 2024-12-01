import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CategoryEntity } from './category.entity';

@Entity()
export class RecordEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'float', nullable: false })
  amount: number;

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.records)
  user: UserEntity;

  @ApiProperty({ type: CategoryEntity })
  @ManyToOne(() => CategoryEntity, (category) => category.records)
  category: string;

  @ApiProperty({ type: Date })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
