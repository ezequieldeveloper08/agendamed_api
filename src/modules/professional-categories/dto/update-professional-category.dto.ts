import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalCategoryDto } from './create-professional-category.dto';

export class UpdateProfessionalCategoryDto extends PartialType(CreateProfessionalCategoryDto) {}
