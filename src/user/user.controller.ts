import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserBadge } from './user-badge.entity';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    return this.userService.createUser(username, email, password);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details.' })
  async getUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/badges')
  findAllBadges(@Param('id') id: number): Promise<UserBadge[]> {
    return this.userService.findAllBadges(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/redeem/:slug')
  redeemBadge(
    @Param('id') id: number,
    @Param('slug') slug: string,
  ): Promise<UserBadge> {
    return this.userService.redeemBadge(id, slug);
  }
}
