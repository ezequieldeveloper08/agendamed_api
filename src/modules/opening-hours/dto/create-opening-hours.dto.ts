import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { WeekDay } from '../entities/opening-hours.entity';

export class CreateOpeningHoursDto {
  @ApiProperty({ enum: WeekDay, example: WeekDay.SEGUNDA })
  @IsEnum(WeekDay)
  day: WeekDay;

  @ApiProperty({ example: '08:00' })
  @IsString()
  start: string;

  @ApiProperty({ example: '18:00' })
  @IsString()
  end: string;
}
