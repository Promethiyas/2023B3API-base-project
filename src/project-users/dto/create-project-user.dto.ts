import { IsDateString } from "class-validator";

export class CreateProjectUserDto {
    @IsDateString()
    startDate!: Date;
    @IsDateString()
    endDate!: Date;
    userId!: string;
    projectId!: string
}
