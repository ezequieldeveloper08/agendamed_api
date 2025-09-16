import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { CreateOpeningHoursDto } from 'src/modules/opening-hours/dto/create-opening-hours.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateProfessionalDto {
  @ApiProperty({ example: 'Dra. Maria Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Dentista especializada em ortodontia' })
  @IsString()
  description: string;

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
