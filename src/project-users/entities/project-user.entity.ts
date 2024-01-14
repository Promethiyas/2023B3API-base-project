import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Project } from "../../projects/entities/project.entity"

@Entity()
export class ProjectUser {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    startDate: Date

    @Column()
    endDate : Date


    @Column()
    userId: string

    @ManyToOne(()=>User)
    @JoinColumn({name  : 'userId'})
    user: string


    @Column()
    projectId: string

    @ManyToOne(()=>Project)
    @JoinColumn({name  : 'projectId'})
    project: string

}
