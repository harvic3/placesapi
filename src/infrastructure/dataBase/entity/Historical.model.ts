import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.model";

@Entity()
export class Historical {
  @PrimaryGeneratedColumn({ type: "bigint" })
  historicalId: number;

  @Column({ length: 256, nullable: false })
  search: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  eventDate: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, (user) => user.Historical)
  @JoinColumn({ name: "userId", referencedColumnName: "userId" })
  user: User;
}
