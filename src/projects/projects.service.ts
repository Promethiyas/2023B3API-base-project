import { Injectable, Req } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private ProjectRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createProjectDto: CreateProjectDto){
    const newProject = this.ProjectRepository.create({
      ...createProjectDto,
   })
   const test = this.findOneByID("16175195-58b2-4434-8db9-1dde698762bb")
   console.log(test)
   // je verifie le role de moi
      // je verifie le role du referringEmployeeID
      const insertedProject = await this.ProjectRepository.save(newProject)
      return insertedProject;

  }

  getMe(@Req() req) {
    const personalInfos = req.user
    return this.usersRepository.findOne({
      where: {
        id: personalInfos.id
      }
    });
 }

  async findOneByID(id : string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
    where: {id},
    select: { 
      id: true,
      email: true,
      username: true,
      role : true
    }
    });
  }

  // findAll() {
  //   return `This action returns all projects`;
  // }

  // findOne(id: string) {
  //   return `This action returns a #${id} project`;
  // }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
