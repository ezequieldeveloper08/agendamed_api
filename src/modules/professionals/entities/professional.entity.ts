import { Address } from "src/modules/address/entities/address.entity";
import { Location } from "src/modules/locations/entities/location.entity";
import { OpeningHours } from "src/modules/opening-hours/entities/opening-hours.entity";
import { ProfessionalCategory } from "src/modules/professional-categories/entities/professional-category.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export const professions = [
    {
        value: "medico",
        label: "Médico",
        council: "CRM",
        placeholder: "CRM/SP 123456"
    },
    {
        value: "dentista",
        label: "Dentista",
        council: "CRO",
        placeholder: "CRO/SP 12345"
    },
    {
        value: "nutricionista",
        label: "Nutricionista",
        council: "CRN",
        placeholder: "CRN-3 12345"
    },
    {
        value: "psicologo",
        label: "Psicólogo",
        council: "CRP",
        placeholder: "CRP 06/123456"
    },
    {
        value: "enfermeiro",
        label: "Enfermeiro",
        council: "COREN",
        placeholder: "COREN-SP 123456"
    },
    {
        value: "fisioterapeuta",
        label: "Fisioterapeuta",
        council: "CREFITO",
        placeholder: "CREFITO-3 123456-F"
    },
    {
        value: "farmaceutico",
        label: "Farmacêutico",
        council: "CRF",
        placeholder: "CRF-SP 12345"
    }
];

export const specialtiesByProfession = {
    medico: [
        "Cardiologia", "Dermatologia", "Endocrinologia", "Gastroenterologia",
        "Ginecologia", "Neurologia", "Oftalmologia", "Ortopedia",
        "Pediatria", "Psiquiatria", "Urologia", "Clínico Geral"
    ],
    dentista: [
        "Ortodontia", "Endodontia", "Periodontia", "Implantodontia",
        "Odontopediatria", "Cirurgia Oral", "Estética Dental", "Prótese Dentária",
        "Dentística", "Radiologia Odontológica"
    ],
    nutricionista: [
        "Nutrição Clínica", "Nutrição Esportiva", "Nutrição Materno-Infantil",
        "Nutrição Geriátrica", "Nutrição Oncológica", "Nutrição Comportamental",
        "Nutrição Funcional", "Nutrição Vegana/Vegetariana"
    ],
    psicologo: [
        "Psicologia Clínica", "Psicologia Cognitivo-Comportamental", "Psicanálise",
        "Psicologia Infantil", "Psicologia do Casal", "Psicologia Organizacional",
        "Neuropsicologia", "Psicologia Social"
    ],
    enfermeiro: [
        "Enfermagem Geral", "UTI", "Emergência", "Pediatria",
        "Obstetrícia", "Saúde Mental", "Geriatria", "Home Care"
    ],
    fisioterapeuta: [
        "Fisioterapia Ortopédica", "Fisioterapia Neurológica", "Fisioterapia Respiratória",
        "Fisioterapia Esportiva", "Fisioterapia Pediátrica", "Fisioterapia Geriátrica",
        "Fisioterapia Aquática", "RPG"
    ],
    farmaceutico: [
        "Farmácia Clínica", "Farmácia Hospitalar", "Análises Clínicas",
        "Farmácia Estética", "Homeopatia", "Manipulação",
        "Farmácia Popular", "Vigilância Sanitária"
    ]
};

export enum ProfessionalType {
    medico = 'Médico',
    dentista = 'Dentista',
    nutricionista = 'Nutricionista',
    psicologo = 'Psicólogo',
    enfermeiro = 'Enfermeiro',
    fisioterapeuta = 'Fisioterapeuta',
    farmaceutico = 'Farmacêutico'
}

@Entity()
export class Professional {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'simple-enum', enum: ProfessionalType })
    type: ProfessionalType;

    @Column({ type: 'simple-array', nullable: true })
    specialties: Array<string>;

    @Column({ type: 'simple-array', nullable: true })
    agreements: Array<string>;

    @Column()
    name: string;

    @Column({ type: 'decimal' })
    cost: number;

    @Column()
    description: string;

    @Column({type: 'longtext'})
    bio: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    cellphone: string;

    @Column({ nullable: true })
    document: string;

    @ManyToMany(() => ProfessionalCategory)
    @JoinTable()
    categories: ProfessionalCategory[];

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToMany(() => OpeningHours, openingHours => openingHours.professional)
    openingHours: OpeningHours[];

    @OneToOne(() => User, user => user.professional, { cascade: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ManyToMany(() => Location, (location) => location.professionals, {
        cascade: true,
    })
    @JoinTable()
    locations: Location[];
}
