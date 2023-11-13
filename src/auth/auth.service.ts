import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(mail: string, pass: string): Promise<any> {
    const saltOrRounds = 10;
    const user = await this.usersService.findOne(mail);    
    if (!(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }else{
      //const { password, ...result } = user;
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return user;
    }
  }
}