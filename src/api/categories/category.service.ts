import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    private readonly userService: UserService,
  ) {}

  public async createCategory(data: CreateCategoryDTO) {
    if (data.userId) await this.userService.getUserById(data.userId);
    return await this.categoryRepo.save(data);
  }

  public async getCategories(userId?: string) {
    const queryBuilder = this.categoryRepo.createQueryBuilder('category');

    if (userId) {
      queryBuilder
        .where('category.userId = :userId', { userId })
        .orWhere('category.userId IS NULL');
    } else {
      queryBuilder.where('category.userId IS NULL');
    }

    return await queryBuilder.getMany();
  }

  public async getCategoryById(id: string): Promise<CategoryEntity> {
    return await this.categoryRepo.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException('No such categories');
    });
  }

  public async deleteCategory(id: string) {
    await this.categoryRepo.delete({ id });
  }
}
