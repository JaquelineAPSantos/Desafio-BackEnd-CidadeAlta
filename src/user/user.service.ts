import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserBadge } from './user-badge.entity';
import { Badge } from '../badge/badge.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(UserBadge)
    private userBadgeRepository: Repository<UserBadge>,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(username);
  }

  async findOne(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findAllBadges(userId: number): Promise<UserBadge[]> {
    return this.userBadgeRepository.find({
      where: { user: { id: userId } },
      relations: ['badge'],
    });
  }

  async redeemBadge(userId: number, slug: string): Promise<UserBadge> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
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

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
