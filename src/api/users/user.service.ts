import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { AbstractRepository } from 'src/database/utils/abstract.repo';
import { NameDTO } from './dto/name.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: AbstractRepository<User>) {}

  createUser(data: NameDTO) {
    return this.userRepo.create(data);
  }

  getUsers() {
    return this.userRepo.findByCriteria();
  }

  getUserById(id: string) {
    return this.userRepo.findOrThrow(id);
  }

  deleteUser(id: string) {
    return this.userRepo.deleteById(id);
  }
}
