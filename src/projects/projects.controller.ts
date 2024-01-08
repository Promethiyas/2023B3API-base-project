import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, Inject, ParseUUIDPipe, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../jwt-auth-guard';
import { UsersService } from '../users/users.service';
import { NotFoundError } from 'rxjs';


@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    @Inject(UsersService)
    private usersService: UsersService
  ) {}



  @UseGuards(JwtAuthGuard)
  @Get("/")
  async findAll(@Req() req) {
    if (req.user.role != "Employee"){
     return this.projectsService.findAll();
    }else{
      const res = await this.projectsService.findAllButWithMe(req.user.userId)
      if (res != null){
        return res;
      }
    }
  }



  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(@Req() req, @Body() createProjectDto: CreateProjectDto) {
    if (req.user.role != "Admin"){
      throw new UnauthorizedException()
    }else{
      const res = await  this.usersService.findOneByID(createProjectDto.referringEmployeeId)
      if (res.role == "Employee" || res == null){
        throw new UnauthorizedException()
      }else{
        return this.projectsService.create(createProjectDto, res);
      }
    }
  }
 
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param('id', new ParseUUIDPipe()) findId, @Req() req) {
    if (req.user.role != "Employee"){
      const res = await this.projectsService.findOneByID(findId)
      if (res != null){
        return res;
      }else{
        throw new NotFoundException()
      }
    }
  }


  
  

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectsService.update(+id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(+id);
  // }
}
