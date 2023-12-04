import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersController } from '../users/users.controller';
import { UsersModule } from '../users/users.module';
import { useContainer } from 'class-validator';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UsersModule,
    JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  }),
],
  providers: [AuthService],
  controllers: [UsersController],
})
export class AuthModule {}