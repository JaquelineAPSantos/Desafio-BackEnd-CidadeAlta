import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserBadge } from './user-badge.entity';
import { Badge } from '../badge/badge.entity';
import { UserRepository } from './user.repository';
import { UserBadgeRepository } from './user-badge.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userBadgeRepository: UserBadgeRepository,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) {}

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    if (!username) {
      username = 'default_username';
    }
    if (!password) {
      password = 'default_password';
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user || null;
  }

  async findOne(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findAllBadges(userId: number): Promise<UserBadge[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userBadges'],
    });
    return user?.userBadges || [];
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
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }
}
