import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { MySQLService } from 'src/config/mysql.service';
import { Pool } from 'mysql2/promise';
import formatData from 'src/utils/format';

@Injectable()
export class AuthService {
  pool: Pool;
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private mysqlService: MySQLService,
  ) {
    this.pool = this.mysqlService.pool;
  }

  async getUserInfoFromGithub(accessToken) {
    try {
      const { data } = await this.httpService.axiosRef.get(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        },
      );

      return data;
    } catch (e) {
      throw new HttpException(
        `Can't load User information. Maybe Access Token is Wrong`,
        401,
      );
    }
  }

  async getAccessToken(code: string) {
    const { data } = await this.httpService.axiosRef.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.configService.get('CLIENT_ID'),
        client_secret: this.configService.get('CLIENT_SECRET'),
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return data.access_token;
  }

  async findOAuthUser(githubUserId: string) {
    const [result] = await this.pool.execute(
      `SELECT * FROM USER WHERE githubUserId = ${githubUserId}`,
    );

    return result[0];
  }

  async signup(user: any) {
    // const result = await this.pool.execute(
    //   `INSERT INTO USER (${Object.keys(user).join()})
    //   VALUES (${Object.values(user).map(formatData).join()})
    //   `,
    // );

    console.log(user);

    return user;
  }
}
