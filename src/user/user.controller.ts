import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserBadge } from './user-badge.entity';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { CreateUserDto } from '../dtos/user.dto';
import { RedeemBadgeDto } from 'src/dtos/redeem-badge.dto';

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
  @ApiResponse({ status: 409, description: 'Username or Email already taken' })
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiResponse({ status: 200, description: 'User details.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<User | undefined> {
    return this.userService.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/badges')
  @ApiOperation({ summary: 'Get all badges for a user' })
  @ApiResponse({ status: 200, description: 'List of user badges.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findAllBadges(@Param('id') id: number): Promise<UserBadge[]> {
    return this.userService.findAllBadges(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/redeem/:slug')
  @ApiOperation({ summary: 'Redeem a badge for a user' })
  @ApiResponse({ status: 201, description: 'Badge successfully redeemed.' })
  @ApiResponse({ status: 404, description: 'User or Badge not found.' })
  @ApiResponse({ status: 409, description: 'Badge already redeemed.' })
  async redeemBadge(
    @Param('id') id: number,
    @Param('slug') slug: string,
    @Body(new ValidationPipe()) redeemBadgeDto: RedeemBadgeDto,
  ): Promise<UserBadge> {
    return this.userService.redeemBadge(id, redeemBadgeDto.slug);
  }
}
