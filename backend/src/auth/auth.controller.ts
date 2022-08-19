import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth/github')
  async githubAuthentication(@Body('code') code: string) {
    const token = await this.authService.getAccessToken(code);
    const userInfo = await this.authService.getUserInfoFromGithub(token);

    return { githubId: userInfo.id, nickname: userInfo.login };
  }
}
