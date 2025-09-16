import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalCategoriesService } from './professional-categories.service';
import { CreateProfessionalCategoryDto } from './dto/create-professional-category.dto';
import { UpdateProfessionalCategoryDto } from './dto/update-professional-category.dto';

@Controller('professional-categories')
export class ProfessionalCategoriesController {
  constructor(private readonly professionalCategoriesService: ProfessionalCategoriesService) {}

  @Post()
  create(@Body() createProfessionalCategoryDto: CreateProfessionalCategoryDto) {
    return this.professionalCategoriesService.create(createProfessionalCategoryDto);
  }

  @Get()
  findAll() {
    return this.professionalCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionalCategoryDto: UpdateProfessionalCategoryDto) {
    return this.professionalCategoriesService.update(+id, updateProfessionalCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalCategoriesService.remove(+id);
  }
}
