import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Location } from "src/modules/locations/entities/location.entity";
import { Professional } from "src/modules/professionals/entities/professional.entity";

export enum UserType {
    patient = 'Paciente',
    professional = 'Profissional',
    establishment_owner = 'Dono de Estabelecimento',
}

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'simple-enum', enum: UserType, default: UserType.patient })
    type: UserType;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    cellphone: string;

    @Column({ nullable: true })
    document: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    dateOfBirth: string;

    @Column()
    gender: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Location, location => location.manager, { eager: true, })
    localManager: Location[];

    @OneToOne(() => Professional, professional => professional.user)
    professional: Professional;

    @BeforeInsert()
    hashPassword() {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, 10);
        }
    }

    @BeforeUpdate()
    convertEmptyStringsToNull() {
        Object.keys(this).forEach(key => {
            if (this[key] === '') {
                this[key] = null;
            }
        });
    }
}
