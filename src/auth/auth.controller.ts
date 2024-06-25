import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { User } from '../user/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from 'src/dtos/user-login.dto';
// import { CreateUserDto } from 'src/user/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // @ApiOperation({ summary: 'Register a new user' })
  // @ApiResponse({ status: 201, description: 'User successfully registered.' })
  // async(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.authService.register(createUserDto);
  // }

  @Post('login')
  @ApiOperation({ summary: 'Login user and return token' })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  async login(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(userLoginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
