import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Badge } from './badge.entity';

@Injectable()
export class BadgeRepository extends Repository<Badge> {
  constructor(dataSource: DataSource) {
    super(Badge, dataSource.createEntityManager());
  }

  async findAll(): Promise<Badge[]> {
    return this.find();
  }

  async findByName(name: string): Promise<Badge | undefined> {
    return this.findOne({ where: { name } });
  }

  async updateBadgeInfo(
    slug: string,
    updateData: Partial<Badge>,
  ): Promise<void> {
    await this.update({ slug }, updateData);
  }

  async removeBySlug(slug: string): Promise<void> {
    await this.delete({ slug });
  }

  async findPaginatedBadges(skip: number, take: number): Promise<Badge[]> {
    return this.find({
      skip,
      take,
    });
  }
}
