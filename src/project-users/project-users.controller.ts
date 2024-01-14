import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject, Req, UnauthorizedException, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ProjectUsersService } from './project-users.service';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { JwtAuthGuard } from '../jwt-auth-guard';
import { UsersService } from '../users/users.service';
import { NotFoundError } from 'rxjs';
import { ProjectsService } from '../projects/projects.service';

@Controller('project-users')
export class ProjectUsersController {
  constructor(private readonly projectUsersService: ProjectUsersService,
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(ProjectsService)
    private projectService: ProjectsService
    ) {}

  @UseGuards(JwtAuthGuard)
  @Post("/")
  create(@Req() req,@Body() createProjectUserDto: CreateProjectUserDto) {
    if (req.user.role != "Employee"){
      const res = this.usersService.findOneByID(createProjectUserDto.userId)
      if (res != null){
        const res = this.projectService.findOneByID(createProjectUserDto.projectId)
        if (res != null){
            return this.projectUsersService.create(createProjectUserDto);
        }else{
          throw new NotFoundException()
        }
      }else{
        throw new NotFoundException()
      }
    }else{
      throw new UnauthorizedException()
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  findAll(@Req()  req){
    if (req.user.role != "Employee"){
      return this.projectUsersService.findAll()
    }
  }


  async findOne(@Param('id', new ParseUUIDPipe()) findId, @Req() req) {
    if (req.user.role != "Employee"){
      const res = await this.projectUsersService.findOneByID(findId)
      if (res != null){
        return res;
      }else{
        throw new NotFoundException()
      }
    }
  }




  // @Get()
  // findAll() {
  //   return this.projectUsersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectUsersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectUserDto: UpdateProjectUserDto) {
  //   return this.projectUsersService.update(+id, updateProjectUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectUsersService.remove(+id);
  // }
}
