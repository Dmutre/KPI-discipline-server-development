import { PipeTransform, Injectable } from '@nestjs/common';
import { CategoryService } from '../category.service';

@Injectable()
export class CategoryExistPipe implements PipeTransform {
  constructor(private readonly categoryService: CategoryService) {}

  async transform(id: any) {
    const exntity = await this.categoryService.getCategoryById(id);
    return exntity.id;
  }
}
