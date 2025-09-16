import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Address } from 'src/modules/address/entities/address.entity';
import { OpeningHours } from 'src/modules/opening-hours/entities/opening-hours.entity';
import { ProfessionalCategory } from 'src/modules/professional-categories/entities/professional-category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(OpeningHours)
    private readonly openingHoursRepository: Repository<OpeningHours>,

    @InjectRepository(ProfessionalCategory)
    private readonly categoryRepository: Repository<ProfessionalCategory>,
  ) {}

  async create(createProfessionalDto: CreateProfessionalDto) {
    const { user, address, openingHours, categories, ...rest } = createProfessionalDto;

    const newUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
    await this.userRepository.save(newUser);

    const newAddress = this.addressRepository.create(address);
    await this.addressRepository.save(newAddress);

    const categoryEntities = await this.categoryRepository.find({
      where: { id: In(categories) },
    });

    const professional = this.professionalRepository.create({
      ...rest,
      user: newUser,
      address: newAddress,
      categories: categoryEntities,
    });
    await this.professionalRepository.save(professional);

    if (openingHours && openingHours.length > 0) {
      const openingHoursEntities = this.openingHoursRepository.create(
        openingHours.map((o) => ({ ...o, professional })),
      );
      await this.openingHoursRepository.save(openingHoursEntities);
      professional.openingHours = openingHoursEntities;
    }

    return {
      success: true,
      message: 'Professional created successfully',
      data: professional,
    };
  }

  async findAll(page = 1, limit = 10) {
    const [result, total] = await this.professionalRepository.findAndCount({
      relations: ['user', 'address', 'categories', 'openingHours'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      success: true,
      total,
      page,
      data: result,
    };
  }

  async findOne(id: string) {
    const professional = await this.professionalRepository.findOne({
      where: { id },
      relations: ['user', 'address', 'categories', 'openingHours'],
    });

    if (!professional) {
      throw new NotFoundException({
        success: false,
        message: `Professional with id ${id} not found`,
      });
    }

    return {
      success: true,
      message: 'Professional found successfully',
      data: professional,
    };
  }

  async update(id: string, updateProfessionalDto: UpdateProfessionalDto) {
    const professional = await this.findOne(id);
    const { user, address, openingHours, categories, ...rest } =
      updateProfessionalDto;

    if (user) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
      Object.assign(professional.data.user, user);
      await this.userRepository.save(professional.data.user);
    }

    if (address) {
      Object.assign(professional.data.address, address);
      await this.addressRepository.save(professional.data.address);
    }

    if (categories) {
      const categoryEntities = await this.categoryRepository.find({
        where: { id: In(categories) },
      });
      professional.data.categories = categoryEntities;
    }

    if (openingHours) {
      await this.openingHoursRepository.delete({ professional: { id } });
      const openingHoursEntities = this.openingHoursRepository.create(
        openingHours.map((o) => ({ ...o, professional: professional.data })),
      );
      await this.openingHoursRepository.save(openingHoursEntities);
      professional.data.openingHours = openingHoursEntities;
    }

    Object.assign(professional.data, rest);
    const updated = await this.professionalRepository.save(professional.data);

    return {
      success: true,
      message: 'Professional updated successfully',
      data: updated,
    };
  }

  async remove(id: string) {
    const professional = await this.findOne(id);
    await this.professionalRepository.remove(professional.data);

    return {
      success: true,
      message: 'Professional removed successfully',
      data: professional.data,
    };
  }
}
