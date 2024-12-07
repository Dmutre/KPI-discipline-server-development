import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Register endpoint' })
  public async register(@Body() { name, password }: RegisterDTO) {
    const token = await this.authService.register(name, password);
    return { token };
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login endpoint' })
  async login(@Body() { name, password }: RegisterDTO) {
    const token = await this.authService.login(name, password);
    return { token };
  }
}