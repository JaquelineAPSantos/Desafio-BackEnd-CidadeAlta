import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserBadge } from './user-badge.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => UserBadge, (userBadge) => userBadge.user)
  userBadges: UserBadge[];
}
