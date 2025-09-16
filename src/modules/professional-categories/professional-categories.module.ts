import { Module } from '@nestjs/common';
import { ProfessionalCategoriesService } from './professional-categories.service';
import { ProfessionalCategoriesController } from './professional-categories.controller';

@Module({
  controllers: [ProfessionalCategoriesController],
  providers: [ProfessionalCategoriesService],
})
export class ProfessionalCategoriesModule {}
