import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    uf: string;

    @Column()
    city: string;

    @Column()
    route: string;

    @Column()
    district: string;

    @Column()
    number: string;

    @Column()
    zipcode: string;
}