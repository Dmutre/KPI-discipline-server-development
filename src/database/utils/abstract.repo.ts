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
    console.log(this.entities);
    return entity;
  }

  findOrThrow(id: string) {
    console.log(this.entities);
    const entity = this.entities.find((entity) => entity.id === id);
    if (!entity) throw new NotFoundException('Entity not found');
    return entity;
  }

  findByCriteria(criteria: Partial<TEntity> = {}): TEntity[] {
    console.log(this.entities);
    return this.entities.filter((entity) =>
      Object.entries(criteria).every(([key, value]) => entity[key] === value),
    );
  }

  deleteById(id: string): void {
    console.log(this.entities);
    const index = this.entities.findIndex((entity) => entity.id === id);
    if (index === -1) {
      throw new NotFoundException('Entity not found');
    }
    console.log(this.entities);
    this.entities.splice(index, 1);
  }
}
