import { Module } from '@nestjs/common';
import { LocationCategoriesService } from './location-categories.service';
import { LocationCategoriesController } from './location-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationCategory } from './entities/location-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationCategory])],
  controllers: [LocationCategoriesController],
  providers: [LocationCategoriesService],
})
export class LocationCategoriesModule {}
