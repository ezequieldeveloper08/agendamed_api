import { Location } from "src/modules/locations/entities/location.entity";
import { Professional } from "src/modules/professionals/entities/professional.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum WeekDay {
    SEGUNDA = 'SEGUNDA',
    TERCA = 'TERCA',
    QUARTA = 'QUARTA',
    QUINTA = 'QUINTA',
    SEXTA = 'SEXTA',
    SABADO = 'SABADO',
    DOMINGO = 'DOMINGO',
}

@Entity()
export class OpeningHours {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: WeekDay,
    })
    day: WeekDay;

    @Column('time')
    start: string;

    @Column({ type: 'date', nullable: true })
    specificDate?: Date;

    @Column('time')
    end: string;

    @ManyToOne(() => Professional, { onDelete: 'CASCADE' })
    professional: Professional;

    @ManyToOne(() => Location, { onDelete: 'CASCADE' })
    location: Location;
}