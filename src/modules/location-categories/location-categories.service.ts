import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationCategory } from './entities/location-category.entity';
import { CreateLocationCategoryDto } from './dto/create-location-category.dto';
import { UpdateLocationCategoryDto } from './dto/update-location-category.dto';

@Injectable()
export class LocationCategoriesService {
  constructor(
    @InjectRepository(LocationCategory)
    private readonly categoryRepository: Repository<LocationCategory>,
  ) {}

  async create(dto: CreateLocationCategoryDto) {
    const category = this.categoryRepository.create(dto);
    await this.categoryRepository.save(category);

    return {
      success: true,
      message: 'Category created successfully',
      data: category,
    };
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return {
      success: true,
      data: categories,
    };
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException({
        success: false,
        message: `Category with id ${id} not found`,
      });
    }

    return {
      success: true,
      message: 'Category found successfully',
      data: category,
    };
  }

  async update(id: number, dto: UpdateLocationCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException({
        success: false,
        message: `Category with id ${id} not found`,
      });
    }

    Object.assign(category, dto);
    const updated = await this.categoryRepository.save(category);

    return {
      success: true,
      message: 'Category updated successfully',
      data: updated,
    };
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException({
        success: false,
        message: `Category with id ${id} not found`,
      });
    }

    await this.categoryRepository.remove(category);

    return {
      success: true,
      message: 'Category removed successfully',
      data: category,
    };
  }
}
