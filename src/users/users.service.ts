import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { And, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, saltOrRounds),
    })
    const insertedUser = await this.usersRepository.save(newUser)
    delete insertedUser.password
    return insertedUser
  }


  findAll(): Promise<User[] | undefined> {
    return this.usersRepository.find();
  }

  async findOne(email : string, bool : boolean): Promise<User | undefined> {
    return await this.usersRepository.findOne({
    where: {email},
    select: { 
      id: true,
      email: true,
      password: bool,
      username: true,
      role : true
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

  



  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
