import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Location } from './entities/location.entity';
import { Address } from 'src/modules/address/entities/address.entity';
import { Professional } from 'src/modules/professionals/entities/professional.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationCategory } from '../location-categories/entities/location-category.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,

    @InjectRepository(LocationCategory)
    private readonly categoryRepository: Repository<LocationCategory>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { address, professionals, categories, ...rest } = createLocationDto;

    // Cria endereço
    const newAddress = this.addressRepository.create(address);
    await this.addressRepository.save(newAddress);

    // Busca profissionais
    let professionalEntities: Professional[] = [];
    if (professionals?.length) {
      professionalEntities = await this.professionalRepository.find({
        where: { id: In(professionals) },
      });
    }

    // Busca categorias
    let categoryEntities: LocationCategory[] = [];
    if (categories?.length) {
      categoryEntities = await this.categoryRepository.find({
        where: { id: In(categories) },
      });
    }

    // Cria Location
    const location = this.locationRepository.create({
      ...rest,
      address: newAddress,
      professionals: professionalEntities,
      categories: categoryEntities,
    });

    await this.locationRepository.save(location);

    return {
      success: true,
      message: 'Location created successfully',
      data: location,
    };
  }

  async findAll(page = 1, limit = 10) {
    const [locations, total] = await this.locationRepository.findAndCount({
      relations: ['address', 'professionals', 'categories'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      success: true,
      total,
      page,
      data: locations,
    };
  }

  async findOne(id: string) {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['address', 'professionals', 'categories'],
    });

    if (!location) {
      throw new NotFoundException({
        success: false,
        message: `Location with id ${id} not found`,
      });
    }

    return {
      success: true,
      message: 'Location found successfully',
      data: location,
    };
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['address', 'professionals', 'categories'],
    });

    if (!location) {
      throw new NotFoundException({
        success: false,
        message: `Location with id ${id} not found`,
      });
    }

    const { address, professionals, categories, ...rest } = updateLocationDto;

    // Atualiza endereço
    if (address) {
      Object.assign(location.address, address);
      await this.addressRepository.save(location.address);
    }

    // Atualiza profissionais
    if (professionals) {
      const professionalEntities = await this.professionalRepository.find({
        where: { id: In(professionals) },
      });
      location.professionals = professionalEntities;
    }

    // Atualiza categorias
    if (categories) {
      const categoryEntities = await this.categoryRepository.find({
        where: { id: In(categories) },
      });
      location.categories = categoryEntities;
    }

    Object.assign(location, rest);
    const updated = await this.locationRepository.save(location);

    return {
      success: true,
      message: 'Location updated successfully',
      data: updated,
    };
  }

  async remove(id: string) {
    const location = await this.locationRepository.findOne({ where: { id } });

    if (!location) {
      throw new NotFoundException({
        success: false,
        message: `Location with id ${id} not found`,
      });
    }

    await this.locationRepository.remove(location);

    return {
      success: true,
      message: 'Location removed successfully',
      data: location,
    };
  }
}
 