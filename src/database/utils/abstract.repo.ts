import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ scope: Scope.TRANSIENT })
export class AbstractRepository<TEntity extends AbstractEntity> {
  private readonly entities: TEntity[] = [];

  create(data: Omit<TEntity, 'id'>) {
    const id = uuidv4();
    const entity = { ...data, id } as TEntity;
    this.entities.push(entity);
    return entity;
  }

  findOrThrow(id: string) {
    const entity = this.entities.find((entity) => entity.id === id);
    if (!entity) throw new NotFoundException('Entity not found');
    return entity;
  }

  findByCriteria(criteria: Partial<TEntity> = {}): TEntity[] {
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
