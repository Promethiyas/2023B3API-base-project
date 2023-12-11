import { IsNotEmpty, IsEmail, Length, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class ByID{
    @IsNotEmpty()
    id!: string;
}