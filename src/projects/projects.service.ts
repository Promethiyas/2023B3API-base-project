import { Injectable, Req, Body } from '@nestjs/common';
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

  async create(createProjectDto: CreateProjectDto, user: User){
    const newProject = this.ProjectRepository.create({
      ...createProjectDto,
   })
      const insertedProject = await this.ProjectRepository.save(newProject)
      .then((project) => {
        project.referringEmployee = user
        return project
      })
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

  async findOneByID(id : string): Promise<Project | undefined> {
    return await this.ProjectRepository.findOne({
    where: {id},
    });
  }

  findAll() {
   return this.ProjectRepository.find();
 }
 
 findAllButWithMe(id: string) {
  return this.ProjectRepository.find({
    where: {referringEmployeeId: id} //colonne puis valeur
  });
}

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
