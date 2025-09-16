import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    date: string;

    @Column('time')
    start: string;

    @Column('time')
    end: string;
}
