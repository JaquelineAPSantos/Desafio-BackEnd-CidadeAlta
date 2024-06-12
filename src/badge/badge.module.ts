import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './badge.entity';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  providers: [BadgeService],
  controllers: [BadgeController],
  exports: [TypeOrmModule, BadgeService],
})
export class BadgeModule {}
