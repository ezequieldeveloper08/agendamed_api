
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if(!user) throw new UnauthorizedException('Email e/ou senha incorreto(s).');

    const isValid = compareSync(pass, user.password,);
    if (!isValid) {
      throw new UnauthorizedException('Email e/ou senha incorreto(s).');
    }
    const {password, ...userData} = user;
    const payload = { sub: user.id, username: user.name };
    return {
      user: userData,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile(id: string) {
    return await this.usersService.findOne(id);
  }
}
