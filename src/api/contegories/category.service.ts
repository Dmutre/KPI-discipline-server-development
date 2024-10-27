import { Injectable } from '@nestjs/common';
import { Category } from 'src/database/entities/category.entity';
import { AbstractRepository } from 'src/database/utils/abstract.repo';
import { NameDTO } from '../users/dto/name.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: AbstractRepository<Category>) {}

  createCategory(data: NameDTO) {
    return this.categoryRepo.create(data);
  }

  getCategories() {
    return this.categoryRepo.findByCriteria();
  }

  deleteCategory(id: string) {
    return this.categoryRepo.deleteById(id);
  }
}
