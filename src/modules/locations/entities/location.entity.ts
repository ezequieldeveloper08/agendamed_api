import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Address } from 'src/modules/address/entities/address.entity';
import { Professional } from 'src/modules/professionals/entities/professional.entity';
import { LocationCategory } from 'src/modules/location-categories/entities/location-category.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Professional, (professional) => professional.locations)
  professionals: Professional[];

  @ManyToMany(() => LocationCategory, { cascade: true })
  @JoinTable()
  categories: LocationCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
