import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode, HttpStatus, Req, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import {Request,   UseGuards} from '@nestjs/common';
import { UUID } from 'crypto';
import { JwtAuthGuard } from '../jwt-auth-guard';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}

  @Post('auth/sign-up')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('auth/login')
  login(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    const personalInfos = req.user
    return this.usersService.findOneByID(personalInfos.userId);
 }

  @UseGuards(JwtAuthGuard)
  @Get(':id') // on remplace :id par un id
  async findOne(@Param('id', new ParseUUIDPipe()) findId) {
    const res = await this.usersService.findOneByID(findId)
    if (res == null){
      throw new NotFoundException();
    }else {
      return this.usersService.findOneByID(findId);
    }    
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

 
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
