import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserBadge } from './user-badge.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @OneToMany(() => UserBadge, (userBadge) => userBadge.user)
  userBadges: UserBadge[];
}
