import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Email do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'João da Silva', description: 'Nome completo do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '1990-05-10', description: 'Data de nascimento (YYYY-MM-DD)' })
  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ example: 'male', description: 'Gênero do usuário (male, female, other)' })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Senha do usuário (mínimo 6 caracteres)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
