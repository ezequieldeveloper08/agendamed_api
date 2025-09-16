import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
