import { Address } from "src/modules/address/entities/address.entity";
import { Location } from "src/modules/locations/entities/location.entity";
import { OpeningHours } from "src/modules/opening-hours/entities/opening-hours.entity";
import { ProfessionalCategory } from "src/modules/professional-categories/entities/professional-category.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Professional {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => ProfessionalCategory)
    @JoinTable()
    categories: ProfessionalCategory[];

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToMany(() => OpeningHours, openingHours => openingHours.professional)
    openingHours: OpeningHours[];

    @OneToOne(() => User, { cascade: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ManyToMany(() => Location, (location) => location.professionals, {
        cascade: true,
    })
    @JoinTable()
    locations: Location[];
}
