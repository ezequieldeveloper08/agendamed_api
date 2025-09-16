import { Professional } from "src/modules/professionals/entities/professional.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OpeningHours {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: [
            'SEGUNDA',
            'TERCA',
            'QUARTA',
            'QUINTA',
            'SEXTA',
            'SABADO',
            'DOMINGO',
        ],
    })
    day: string;

    @Column('time')
    start: string;

    @Column('time')
    end: string;

    @ManyToOne(() => Professional, {onDelete: 'CASCADE'})
    professional: Professional;
}