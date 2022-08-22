import { Controller, Get } from '@nestjs/common';
import { RegionService } from './region.service';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  async getRegions() {
    return this.regionService.getRegions();
  }
}
