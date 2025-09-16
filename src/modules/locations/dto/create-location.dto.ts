import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';

export class CreateLocationDto {
  @ApiProperty({ description: 'Nome do estabelecimento', example: 'Clínica Central' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição do estabelecimento', required: false, example: 'Centro especializado em ortopedia' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: CreateAddressDto, description: 'Endereço do estabelecimento' })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty({ description: 'IDs dos profissionais que atendem nesse local', type: [String], required: false, example: ['uuid1', 'uuid2'] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  professionals?: string[];

  @ApiProperty({ type: [Number], example: [1, 3] })
  @IsArray()
  categories: number[];
}
