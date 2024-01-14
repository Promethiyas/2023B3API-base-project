import { Injectable } from '@nestjs/common';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectUser } from './entities/project-user.entity';

@Injectable()
export class ProjectUsersService {

  constructor(
    @InjectRepository(ProjectUser)
    private ProjectUserRepository: Repository<ProjectUser>,
  ) {}

  async create(createProjectUserDto: CreateProjectUserDto) {
    const newProjectUser = this.ProjectUserRepository.create({
      ...createProjectUserDto,
   })
      const insertedProjectUser = await this.ProjectUserRepository.save(newProjectUser)
      return insertedProjectUser;

  }

  findAll() {
     return this.ProjectUserRepository.find();
  }


  async findOneByID(id : string): Promise<ProjectUser | undefined> {
    return await this.ProjectUserRepository.findOne({
    where: {id},
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} projectUser`;
  // }

  // update(id: number, updateProjectUserDto: UpdateProjectUserDto) {
  //   return `This action updates a #${id} projectUser`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} projectUser`;
  // }
}
