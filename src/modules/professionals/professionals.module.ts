import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Address } from '../address/entities/address.entity';
import { ProfessionalCategory } from '../professional-categories/entities/professional-category.entity';
import { User } from '../users/entities/user.entity';
import { OpeningHours } from '../opening-hours/entities/opening-hours.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professional, Address, ProfessionalCategory, User, OpeningHours])],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
})
export class ProfessionalsModule {}
