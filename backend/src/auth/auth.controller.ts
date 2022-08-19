import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth/github')
  async githubAuthentication(@Body('code') code: string) {
    const token = await this.authService.getAccessToken(code);
    const userInfo = await this.authService.getUserInfoFromGithub(token);
    const { id: githubUserId, login: nickname } = userInfo;
    const OAuthUser = await this.authService.findOAuthUser(githubUserId);

    if (OAuthUser) {
      return { isExist: true, user: OAuthUser };
    }

    return { isExist: false, user: { githubUserId, nickname } };
  }

  @Post('signup')
  async signup(@Body('user') user: any) {
    const signupResult = await this.authService.signup(user);

    return signupResult;
  }
}
