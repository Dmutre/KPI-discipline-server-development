import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecordEntity } from './record.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CategoryEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.categories, { nullable: true })
  user?: UserEntity;

  @OneToMany(() => RecordEntity, (record) => record.category)
  records: RecordEntity[];

  @ApiProperty({ type: Date })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
