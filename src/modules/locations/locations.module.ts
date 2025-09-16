import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Address } from '../address/entities/address.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { LocationCategory } from '../location-categories/entities/location-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Address, Professional, LocationCategory])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
