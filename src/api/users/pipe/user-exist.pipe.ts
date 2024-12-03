import { PipeTransform, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class UserExistPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(userId: any) {
    const user = await this.userService.getUserById(userId);
    return user.id;
  }
}
