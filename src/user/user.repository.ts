import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserBadge } from './user-badge.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.update(userId, { lastLogin: new Date() });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.find({ where: { isActive: true } });
  }

  async findUsersWithBadge(slug: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .innerJoin(UserBadge, 'user_badge', 'user.id = user_badge.userId')
      .innerJoinAndSelect('user_badge.badge', 'badge')
      .where('badge.slug = :slug', { slug })
      .getMany();
  }

  async findPaginatedUsers(skip: number, take: number): Promise<User[]> {
    return this.find({
      skip,
      take,
    });
  }
}
