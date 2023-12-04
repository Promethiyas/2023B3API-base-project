import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(email, true); 
      if (!(await bcrypt.compare(pass, user.password))) {
        throw new UnauthorizedException();
      }else{
        const payload = { sub: user.id, role: user.role };
       return {
         access_token: await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET }), user
       };
      }
      }
}






// async signIn(mail: string, pass: string): Promise<any> {
//   const user = await this.usersService.findOne(mail); 
//   await bcrypt.compare(pass, user?.password, function(err,res){
//     if(err) {throw new UnauthorizedException(); }
//     if(res == true)
//             {
//               const payload = { sub: user.id, role: user.role };
//               return {
//                 access_token: this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET }),user
//               };
//             } else {
//               throw new UnauthorizedException();
//                    }
//             });
//           }