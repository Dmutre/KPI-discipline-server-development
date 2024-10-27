import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { NameDTO } from '../users/dto/name.dto';
import { Category } from 'src/database/entities/category.entity';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiOkResponse({ type: Category })
  createCategory(@Body() data: NameDTO): Category {
    return this.categoryService.createCategory(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: [Category] })
  getAllCategories(): Category[] {
    return this.categoryService.getCategories();
  }

  @Delete('/:categoryId')
  @ApiOperation({ summary: 'Delete category by id' })
  deleteCategory(@Param('categoryId') categoryId: string): void {
    return this.categoryService.deleteCategory(categoryId);
  }
}
