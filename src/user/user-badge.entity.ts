import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { Badge } from '../badge/badge.entity';

@Entity()
@Unique(['user', 'badge'])
export class UserBadge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userBadges)
  user: User;

  @ManyToOne(() => Badge, (badge) => badge.userBadges)
  badge: Badge;

  @Column()
  redeemedAt: Date;
}
