import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersController } from '../users/users.controller';
import { UsersModule } from '../users/users.module';
import { useContainer } from 'class-validator';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
],
  providers: [AuthService],
  controllers: [UsersController],
})
export class AuthModule {}