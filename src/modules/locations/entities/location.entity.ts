import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Address } from 'src/modules/address/entities/address.entity';
import { Professional } from 'src/modules/professionals/entities/professional.entity';
import { User } from 'src/modules/users/entities/user.entity';

export enum LocationType {
  hospital = 'Hospital',
  clinica = 'Clínica',
  laboratorio = 'Laboratório',
  consultorio = 'Consultório',
  prontoSocorro = 'Pronto-Socorro',
  postoSaude = 'Posto de Saúde',
  centroDiagnostico = 'Centro de Diagnóstico',
  unidadeBasicaSaude = 'Unidade Básica de Saúde',
  policlinica = 'Policlínica',
  outro = 'Outro',
}

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({type: 'simple-array', nullable: true})
  images: Array<string>;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Professional, (professional) => professional.locations)
  professionals: Professional[];

  @Column({type: 'simple-enum', enum: LocationType, nullable: true})
  type: LocationType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.localManager, {onDelete: 'CASCADE'})
  manager: User;
}
