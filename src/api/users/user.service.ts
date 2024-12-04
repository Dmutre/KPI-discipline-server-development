import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async createUser(data: CreateUserDTO): Promise<UserEntity> {
    return await this.userRepo.save(data);
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  public async getUserById(id: string): Promise<UserEntity> {
    return await this.userRepo.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException('Such user not found');
    });
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepo.delete({ id });
  }
}
