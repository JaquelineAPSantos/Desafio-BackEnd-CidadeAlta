import { Controller, Get } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { Badge } from './badge.entity';

@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  findAll(): Promise<Badge[]> {
    return this.badgeService.findAll();
  }
}
