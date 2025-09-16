import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto);
    return await this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    return await this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.repository.remove(user);
  }
}
