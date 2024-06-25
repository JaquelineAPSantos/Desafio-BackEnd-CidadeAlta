import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserBadge } from './user-badge.entity';
import { UserRepository } from './user.repository';
import { BadgeModule } from '../badge/badge.module';
import { UserBadgeRepository } from './user-badge.repository';
import { UserController } from './user.controller';
import { DuplicateCheckService } from './duplicate-check.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBadge]), BadgeModule],
  providers: [
    UserService,
    UserRepository,
    UserBadgeRepository,
    DuplicateCheckService,
  ],
  controllers: [UserController],
  exports: [UserService, UserRepository, UserBadgeRepository],
})
export class UserModule {}
