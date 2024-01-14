import { Module } from '@nestjs/common';
import { ProjectUsersService } from './project-users.service';
import { ProjectUsersController } from './project-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';
import { ProjectsController } from '../projects/projects.controller';
import { UsersController } from '../users/users.controller';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ProjectUser } from './entities/project-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectUser]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ProjectsController, UsersController,ProjectUsersController],
  providers: [ProjectsService, UsersService, AuthService, JwtService,ProjectUsersService],
})
export class ProjectUsersModule {}
