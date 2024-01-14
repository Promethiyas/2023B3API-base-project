import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { UsersController } from '../users/users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../jwt-auth-guard';
import { ProjectUser } from '../project-users/entities/project-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([ProjectUser]),
  ],
  controllers: [ProjectsController, UsersController],
  providers: [ProjectsService, UsersService, AuthService, JwtService],
})
export class ProjectsModule {}
