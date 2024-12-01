import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  public async createCategory(data: CreateCategoryDTO) {
    return await this.categoryRepo.create(data);
  }

  public async getCategories(userId?: string) {
    return await this.categoryRepo.find({
      where: userId
        ? [{ user: { id: userId } }, { user: null }]
        : { user: null },
    });
  }

  public async deleteCategory(id: string) {
    await this.categoryRepo.delete({ id });
  }
}
