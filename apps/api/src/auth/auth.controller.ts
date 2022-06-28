import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDto, AuthDto, AuthTokenDto } from './dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return await this.authService.createUser(userDto);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<AuthTokenDto> {
    return this.authService.login(authDto);
  }
}
