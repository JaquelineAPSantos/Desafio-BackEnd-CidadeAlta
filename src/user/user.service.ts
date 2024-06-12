import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserBadge } from './user-badge.entity';
import { Badge } from '../badge/badge.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserBadge)
    private userBadgeRepository: Repository<UserBadge>,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) {}

  async findAllBadges(userId: number): Promise<UserBadge[]> {
    return this.userBadgeRepository.find({
      where: { user: { id: userId } },
      relations: ['badge'],
    });
  }

  async redeemBadge(userId: number, slug: string): Promise<UserBadge> {
    const user = await this.userRepository.findOne(userId);
    const badge = await this.badgeRepository.findOne({ where: { slug } });

    if (!user || !badge) {
      throw new Error('User or Badge not found');
    }

    const existingUserBadge = await this.userBadgeRepository.findOne({
      where: { user, badge },
    });

    if (existingUserBadge) {
      throw new Error('Badge already redeemed');
    }

    const userBadge = new UserBadge();
    userBadge.user = user;
    userBadge.badge = badge;

    return this.userBadgeRepository.save(userBadge);
  }
}
