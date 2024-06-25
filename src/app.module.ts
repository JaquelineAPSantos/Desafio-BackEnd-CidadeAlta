import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeModule } from './badge/badge.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { User } from './user/user.entity';
import { UserBadge } from './user/user-badge.entity';
import { Badge } from './badge/badge.entity';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { jwtConstants } from './jwt/jwtConstants';
import { DuplicateCheckService } from './user/duplicate-check.service';

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
    UserModule,
    BadgeModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    AppService,
    DuplicateCheckService,
  ],
  controllers: [AppController],
})
export class AppModule {}
