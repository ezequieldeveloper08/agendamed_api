import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfessionalCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
