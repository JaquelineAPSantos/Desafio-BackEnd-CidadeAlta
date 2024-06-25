import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserBadge } from './user-badge.entity';
import { Badge } from '../badge/badge.entity';
import { UserRepository } from './user.repository';
import { UserBadgeRepository } from './user-badge.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/user.dto';
import { DuplicateCheckService } from './duplicate-check.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userBadgeRepository: UserBadgeRepository,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
    private readonly duplicateCheckService: DuplicateCheckService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const usernameTaken =
      await this.duplicateCheckService.isUsernameTaken(username);
    if (usernameTaken) {
      throw new ConflictException('Username already taken');
    }
    const emailTaken = await this.duplicateCheckService.isEmailTaken(email);
    if (emailTaken) {
      throw new ConflictException('Email already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || null;
  }

  async findOne(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
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
      throw new NotFoundException('User or Badge not found');
    }

    const existingUserBadge = await this.userBadgeRepository.findOne({
      where: { user, badge },
    });

    if (existingUserBadge) {
      throw new ConflictException('Badge already redeemed');
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
