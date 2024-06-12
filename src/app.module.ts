import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeModule } from './badge/badge.module';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { User } from './user/user.entity';
import { UserBadge } from './user/user-badge.entity';
import { Badge } from './badge/badge.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'newpassword',
      database: 'badge_system',
      entities: [User, UserBadge, Badge],
      synchronize: true,
    }),
    BadgeModule,
    UserModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
