import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { CreateOpeningHoursDto } from 'src/modules/opening-hours/dto/create-opening-hours.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { ProfessionalType } from '../entities/professional.entity';

export class CreateProfessionalDto {
  @ApiProperty({ example: 'medico', enum: ProfessionalType })
  @IsEnum(ProfessionalType)
  type: ProfessionalType;

  @ApiProperty({ example: ['Cardiologia', 'Dermatologia'], required: false })
  @IsArray()
  @IsOptional()
  specialties?: string[];

  @ApiProperty({ example: ['unimed', 'amil'], required: false })
  @IsArray()
  @IsOptional()
  agreements?: string[];

  @ApiProperty({ example: 'Dra. Maria Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: 250 })
  @IsNumber()
  cost: number;

  @ApiProperty({ example: 'Dentista especializada em ortodontia' })
  @IsString()
  description: string;

  @ApiProperty({
    example:
      'Formada pela USP, com mais de 10 anos de experiência em ortodontia e estética dental.',
  })
  @IsString()
  bio: string;

  @ApiProperty({ example: 'https://meuservidor.com/avatar.jpg', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ example: '(11) 99999-9999', required: false })
  @IsOptional()
  @IsString()
  cellphone?: string;

  @ApiProperty({ example: 'CRO/SP 123456', required: false })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({ type: [Number], example: [1, 3] })
  @IsArray()
  categories: number[];

  @ApiProperty({ type: () => CreateAddressDto })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty({ type: [CreateOpeningHoursDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateOpeningHoursDto)
  openingHours: CreateOpeningHoursDto[];

  @ApiProperty({ type: () => CreateUserDto })
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
