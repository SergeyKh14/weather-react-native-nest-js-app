import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("cities")
export class CitiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  geonameId: number;

  @Column({ type: "varchar", length: 255 })
  cityName: string;

  @Column({ type: "varchar", length: 255 })
  country: string;

  @Column({ type: "float" })
  longitude: number;

  @Column({ type: "float" })
  latitude: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
