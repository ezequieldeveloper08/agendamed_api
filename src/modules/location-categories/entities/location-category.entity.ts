import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LocationCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
