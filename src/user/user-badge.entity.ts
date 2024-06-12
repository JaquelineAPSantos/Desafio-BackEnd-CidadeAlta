import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Badge } from '../badge/badge.entity';

@Entity()
export class UserBadge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userBadges)
  user: User;

  @ManyToOne(() => Badge)
  badge: Badge;
}
