import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserBadge } from './user-badge.entity';
import { UserRepository } from './user.repository';
import { Badge } from '../badge/badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBadge, Badge])],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
