import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserBadge } from './user-badge.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Badge } from '../badge/badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBadge, Badge])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
