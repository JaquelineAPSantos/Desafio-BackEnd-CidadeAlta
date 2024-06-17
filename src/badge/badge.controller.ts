import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BadgeService } from './badge.service';
import { Badge } from './badge.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('badges')
@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve badges' })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Number of records to skip for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Number of records to take for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter badges by name',
    type: String,
  })
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('name') name?: string,
  ): Promise<Badge[]> {
    if (name) {
      const badge = await this.badgeService.getBadgeByName(name);
      return badge ? [badge] : [];
    }
    if (skip !== undefined && take !== undefined) {
      return this.badgeService.getPaginatedBadges(skip, take);
    }
    return this.badgeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId/redeemed')
  @ApiOperation({ summary: 'Get redeemed badges for a user' })
  async getRedeemedBadges(@Param('userId') userId: number): Promise<Badge[]> {
    return this.badgeService.getRedeemedBadges(userId);
  }

  @Post(':slug/redeem')
  @ApiOperation({ summary: 'Redeem a badge' })
  async redeemBadge(
    @Param('slug') badgeSlug: string,
    @Body('userId') userId: number,
  ): Promise<void> {
    await this.badgeService.redeemBadge(userId, badgeSlug);
  }
}
