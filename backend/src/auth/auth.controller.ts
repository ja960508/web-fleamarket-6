import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async signup(
    @Body('user') user: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const lastId = await this.authService.signup(user);
    const insertedUser = await this.authService.findUserById(lastId);

    response.cookie('user', insertedUser, { maxAge: 1000 * 60 * 60 * 24 * 15 });
    return insertedUser;
  }

  @Post('signin')
  async signin(
    @Body() user: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userInfo = await this.authService.signin(user);

    response.cookie('user', userInfo, { maxAge: 1000 * 60 * 60 * 24 * 15 });
    return userInfo;
  }
}
