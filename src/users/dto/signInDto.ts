import { IsNotEmpty, IsEmail, Length, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class signIn{
    @IsNotEmpty()
    @IsEmail()
    email!: string;
  
    @IsNotEmpty()
    @MinLength(8)
    password!: string;
}