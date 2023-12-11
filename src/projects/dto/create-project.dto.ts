import { IsNotEmpty, IsEmail, Length, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';


export class CreateProjectDto {

    @MinLength(3) 
    @IsNotEmpty()
    name!: string;
    @IsNotEmpty()
    referringEmployeeId!: string
}
