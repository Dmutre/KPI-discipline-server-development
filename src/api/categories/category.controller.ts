import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { GetCategoryDTO } from './dto/get-category.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiOkResponse({ type: CategoryEntity })
  createCategory(@Body() data: CreateCategoryDTO): Promise<CategoryEntity> {
    return this.categoryService.createCategory(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: [CategoryEntity] })
  getAllCategories(
    @Query() { userId }: GetCategoryDTO,
  ): Promise<CategoryEntity[]> {
    return this.categoryService.getCategories(userId);
  }

  @Delete('/:categoryId')
  @ApiOperation({ summary: 'Delete category by id' })
  deleteCategory(@Param('categoryId') categoryId: string): Promise<void> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
