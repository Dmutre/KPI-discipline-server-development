import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
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
    return await this.jwtService.verifyAsync(token).catch(() => {
      throw new UnauthorizedException('Invalid token');
    });
  }
}
