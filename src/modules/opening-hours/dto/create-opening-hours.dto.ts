import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum DayOfWeek {
  SEGUNDA = 'SEGUNDA',
  TERCA = 'TERCA',
  QUARTA = 'QUARTA',
  QUINTA = 'QUINTA',
  SEXTA = 'SEXTA',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO',
}

export class CreateOpeningHoursDto {
  @ApiProperty({ enum: DayOfWeek, example: DayOfWeek.SEGUNDA })
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ApiProperty({ example: '08:00' })
  @IsString()
  start: string;

  @ApiProperty({ example: '18:00' })
  @IsString()
  end: string;
}
