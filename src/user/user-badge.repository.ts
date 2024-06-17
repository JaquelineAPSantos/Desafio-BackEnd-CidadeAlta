import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserBadge } from './user-badge.entity';

@Injectable()
export class UserBadgeRepository extends Repository<UserBadge> {
  constructor(dataSource: DataSource) {
    super(UserBadge, dataSource.createEntityManager());
  }

  async findByUserAndBadge(
    userId: number,
    badgeId: number,
  ): Promise<UserBadge | undefined> {
    return this.findOne({
      where: {
        user: { id: userId },
        badge: { id: badgeId },
      },
    });
  }

  async findByUserId(userId: number): Promise<UserBadge[]> {
    return this.find({
      where: { user: { id: userId } },
      relations: ['badge'],
    });
  }

  async findByBadgeSlug(slug: string): Promise<UserBadge[]> {
    return this.createQueryBuilder('user_badge')
      .innerJoinAndSelect('user_badge.badge', 'badge')
      .where('badge.slug = :slug', { slug })
      .getMany();
  }

  async findUsersWithBadge(slug: string): Promise<UserBadge[]> {
    return this.createQueryBuilder('user_badge')
      .innerJoinAndSelect('user_badge.user', 'user')
      .innerJoinAndSelect('user_badge.badge', 'badge')
      .where('badge.slug = :slug', { slug })
      .getMany();
  }

  async findPaginatedUserBadges(
    skip: number,
    take: number,
  ): Promise<UserBadge[]> {
    return this.find({
      skip,
      take,
      relations: ['user', 'badge'],
    });
  }
}
