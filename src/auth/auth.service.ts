import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async register(name: string, password: string): Promise<string> {
    await this.throwIfUserExists(name);
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userRepo.save({ name, password: hashedPassword });
    return await this.generateToken({ name: user.name });
  }

  public async login(name: string, password: string): Promise<string> {
    const user = await this.userRepo.findOneBy({ name });
    if (!user) throw new BadRequestException('Such user doesn`t exists');
    await this.comparePasswords(password, user.password);
    return this.generateToken({ name });
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }
  }

  private async throwIfUserExists(name: string): Promise<void> {
    const dbUser = await this.userRepo.findOneBy({ name });
    if (dbUser)
      throw new BadRequestException('User with such name already exists');
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private generateToken(payload: object): string {
    return this.jwtService.sign(payload);
  }

  public async verifyToken(token: string): Promise<any> {
    const { name } = await this.jwtService.verifyAsync(token).catch(() => {
      throw new UnauthorizedException('Invalid token');
    });
    return await this.userRepo.findOneBy({ name });
  }
}
