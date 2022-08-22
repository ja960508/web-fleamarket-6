import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { MySQLService } from 'src/config/mysql/mysql.service';
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
    const client_id = this.configService.get('CLIENT_ID');
    const client_secret = this.configService.get('CLIENT_SECRET');

    if (!client_id || !client_secret || !code)
      throw new HttpException(`Required Data is not Provided.`, 400);

    try {
      const { data } = await this.httpService.axiosRef.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id,
          client_secret,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      return data.access_token;
    } catch (e) {
      throw new HttpException(`Failed to Fetch Token from provider.`, 500);
    }
  }

  async findOAuthUser(githubUserId: string) {
    const [result] = await this.pool.execute(
      `SELECT * FROM USER WHERE githubUserId = ${githubUserId}`,
    );

    return result[0];
  }

  async findUserById(id: number) {
    const [result] = await this.pool.execute(
      `SELECT * FROM USER WHERE id = ${id}`,
    );

    return result[0];
  }

  async signup(user: any) {
    await this.pool.execute(
      `INSERT INTO USER (${Object.keys(user).join()})
      VALUES (${Object.values(user).map(formatData).join()})
      `,
    );

    const [insertId] = await this.pool.execute(`
      SELECT last_insert_id() as last_id;
      `);

    return insertId[0].last_id;
  }

  async signin(user: any) {
    try {
      const [res] = await this.pool.execute(`
      SELECT U.id, U.nickname, U.regionId, R.name as regionName FROM USER as U 
      INNER JOIN REGION as R ON R.id = U.regionId
      WHERE nickname = ${formatData(user.nickname)} AND password = ${formatData(
        user.password,
      )}
    `);

      return res[0];
    } catch (e) {
      console.error(e);
    }
  }
}
