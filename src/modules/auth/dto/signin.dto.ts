import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'user@email.com', description: 'Email do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456', description: 'Senha do usuário (mínimo 6 caracteres)' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}