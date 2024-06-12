import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserBadge } from './user-badge.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/badges')
  findAllBadges(@Param('id') id: number): Promise<UserBadge[]> {
    return this.userService.findAllBadges(id);
  }

  @Post(':id/redeem/:slug')
  redeemBadge(
    @Param('id') id: number,
    @Param('slug') slug: string,
  ): Promise<UserBadge> {
    return this.userService.redeemBadge(id, slug);
  }
}
