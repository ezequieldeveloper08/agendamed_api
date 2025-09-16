import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Endereço Principal' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  uf: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Avenida Paulista' })
  @IsString()
  route: string;

  @ApiProperty({ example: 'Bela Vista' })
  @IsString()
  district: string;

  @ApiProperty({ example: '1000' })
  @IsString()
  number: string;

  @ApiProperty({ example: '01310-100' })
  @IsString()
  zipcode: string;
}
