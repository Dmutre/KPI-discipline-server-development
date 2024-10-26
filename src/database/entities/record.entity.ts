import { AbstractEntity } from '../utils/abstract.entity';

export class Record extends AbstractEntity {
  amount: number;
  userId: string;
  categoryId: string;
  createdAt: Date;
}
