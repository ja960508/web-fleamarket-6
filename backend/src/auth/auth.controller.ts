import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth/github')
  async getAccessToken(@Body('code') code: string) {
    return await this.authService.getAccessToken(code);
  }
}
