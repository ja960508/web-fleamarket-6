import { HttpException, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { MySQLService } from 'src/config/mysql/mysql.service';

@Injectable()
export class RegionService {
  pool: Pool;
  constructor(private readonly mysqlService: MySQLService) {
    this.pool = this.mysqlService.pool;
  }

  async getRegions() {
    try {
      const [regions] = await this.pool.query(`
        SELECT * FROM REGION;
      `);

      return regions;
    } catch (e) {
      throw new HttpException('Failed to GET REGION info', 500);
    }
  }
}
