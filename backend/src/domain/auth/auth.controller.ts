import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth/github')
  async githubAuthentication(
    @Body('code') code: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.getAccessToken(code);
    const userInfo = await this.authService.getUserInfoFromGithub(token);
    const { id: githubUserId, login: nickname } = userInfo;
    const OAuthUser = await this.authService.findOAuthUser(githubUserId);

    if (OAuthUser) {
      const token = this.authService.generateToken(OAuthUser);

      response.cookie('user', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });

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
    const token = this.authService.generateToken(insertedUser);

    response.cookie('user', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return insertedUser;
  }

  @Post('signin')
  async signin(
    @Body() user: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userInfo = await this.authService.signin(user);
    const token = this.authService.generateToken(userInfo);

    response.cookie('user', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return userInfo;
  }

  @Get()
  async getUserInfo(@Req() request: Request) {
    const cookies = request.cookies;
    const token = cookies['user'];

    if (!token) {
      return;
    }

    const userInfo = await this.authService.getUserInfo(cookies['user']);

    return userInfo;
  }
}
