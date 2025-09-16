import { Injectable } from '@nestjs/common';
import { CreateProfessionalCategoryDto } from './dto/create-professional-category.dto';
import { UpdateProfessionalCategoryDto } from './dto/update-professional-category.dto';

@Injectable()
export class ProfessionalCategoriesService {
  create(createProfessionalCategoryDto: CreateProfessionalCategoryDto) {
    return 'This action adds a new professionalCategory';
  }

  findAll() {
    return `This action returns all professionalCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professionalCategory`;
  }

  update(id: number, updateProfessionalCategoryDto: UpdateProfessionalCategoryDto) {
    return `This action updates a #${id} professionalCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} professionalCategory`;
  }
}
