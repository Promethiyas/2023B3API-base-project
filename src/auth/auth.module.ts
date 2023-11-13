import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersController } from '../users/users.controller';
import { UsersModule } from '../users/users.module';
import { useContainer } from 'class-validator';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [UsersController],
})
export class AuthModule {}