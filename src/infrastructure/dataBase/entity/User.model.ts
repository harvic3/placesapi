import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Historical } from "./Historical.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  userId: number;

  @Column({ length: 36, nullable: false, unique: true })
  uid: string;

  @Column({ length: 64, nullable: false })
  disPlayName: string;

  @Column({ length: 64, nullable: false, unique: true })
  email: string;

  @Column({ length: 64, nullable: true })
  phoneNumber: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  registerDate: Date;

  @Column({ length: 2, nullable: true, default: "en" })
  language: string;

  @Column({ default: false, nullable: false })
  disabled: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Historical, (historical) => historical.user)
  Historical: Historical[];
}
