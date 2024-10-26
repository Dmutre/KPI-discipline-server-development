import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';

@Injectable()
export class AbstractRepository<TEntity extends AbstractEntity> {
  private readonly entities: TEntity[] = [];

  create(data: TEntity) {
    const index = this.entities.push(data) - 1;
    return this.entities[index];
  }

  findOrThrow(id: string) {
    const entity = this.entities.find((entity) => entity.id === id);
    if (!entity) throw new NotFoundException('Entity not found');
    return entity;
  }

  findByCriteria(criteria: Partial<TEntity>): TEntity[] {
    return this.entities.filter((entity) =>
      Object.entries(criteria).every(([key, value]) => entity[key] === value),
    );
  }

  deleteById(id: string): void {
    const index = this.entities.findIndex((entity) => entity.id === id);
    if (index === -1) {
      throw new NotFoundException('Entity not found');
    }
    this.entities.splice(index, 1);
  }
}
