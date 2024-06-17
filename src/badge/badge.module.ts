// import { UserBadgeRepository } from 'src/user/user-badge.repository';
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Badge } from './badge.entity';
// import { BadgeService } from './badge.service';
// import { BadgeController } from './badge.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([Badge, UserBadgeRepository])],
//   providers: [BadgeService],
//   controllers: [BadgeController],
//   exports: [TypeOrmModule, BadgeService],
// })
// export class BadgeModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './badge.entity';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { BadgeRepository } from './badge.repository';
import { UserBadgeRepository } from '../user/user-badge.repository';
import { UserBadge } from 'src/user/user-badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge, UserBadge, UserBadgeRepository])],
  providers: [
    BadgeService,
    {
      provide: 'BadgeRepository',
      useClass: BadgeRepository,
    },
    UserBadgeRepository,
  ],
  controllers: [BadgeController],
  exports: [
    TypeOrmModule,
    BadgeService,
    'BadgeRepository',
    UserBadgeRepository,
  ],
})
export class BadgeModule {}
