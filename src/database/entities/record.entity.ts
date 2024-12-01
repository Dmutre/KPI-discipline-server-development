import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @ApiProperty()
  @Column({ nullable: false })
  userId?: string;

  @ManyToOne(() => UserEntity, (user) => user.records)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ApiProperty()
  @Column({ nullable: false })
  categoryId?: string;

  @ManyToOne(() => CategoryEntity, (category) => category.records)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ApiProperty({ type: Date })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
