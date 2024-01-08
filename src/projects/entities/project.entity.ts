import internal from "stream"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    referringEmployeeId : string

    @ManyToOne(()=>User)
    @JoinColumn({name  : 'referringEmployeeId'})
    public referringEmployee: User
}