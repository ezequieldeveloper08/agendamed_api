import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    avatar: string;

    @Column({nullable: true})
    cellphone: string;

    @Column({nullable: true})
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
