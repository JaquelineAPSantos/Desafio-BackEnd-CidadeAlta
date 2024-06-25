import { BadgeRepository } from './badge.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { Badge } from './badge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBadgeRepository } from 'src/user/user-badge.repository';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private badgeRepository: BadgeRepository,
    private userBadgeRepository: UserBadgeRepository,
  ) {}

  async findAll(): Promise<Badge[]> {
    return this.badgeRepository.find();
  }

  async getBadgeByName(name: string): Promise<Badge | undefined> {
    return this.badgeRepository.findByName(name);
  }

  async updateBadge(slug: string, updateData: Partial<Badge>): Promise<void> {
    await this.badgeRepository.updateBadgeInfo(slug, updateData);
  }

  async deleteBadge(slug: string): Promise<void> {
    await this.badgeRepository.removeBySlug(slug);
  }

  async getPaginatedBadges(skip: number, take: number): Promise<Badge[]> {
    return this.badgeRepository.findPaginatedBadges(skip, take);
  }

  async redeemBadge(userId: number, badgeSlug: string): Promise<void> {
    const badge = await this.badgeRepository.findOne({
      where: { slug: badgeSlug },
    });
    if (!badge) {
      throw new Error('Badge not found');
    }

    const existingUserBadge = await this.userBadgeRepository.findByUserAndBadge(
      userId,
      badge.id,
    );
    if (existingUserBadge) {
      throw new ConflictException('Badge already redeemed');
    }

    const userBadge = this.userBadgeRepository.create({
      user: { id: userId },
      badge,
      redeemedAt: new Date(),
    });

    await this.userBadgeRepository.save(userBadge);
  }

  async getRedeemedBadges(userId: number): Promise<Badge[]> {
    const userBadges = await this.userBadgeRepository.find({
      where: { user: { id: userId } },
      relations: ['badge'],
    });
    return userBadges.map((userBadge) => userBadge.badge);
  }
}
