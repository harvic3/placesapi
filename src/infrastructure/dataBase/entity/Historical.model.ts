import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.model";

@Entity()
export class Historical {
  @PrimaryGeneratedColumn({ type: "bigint" })
  historicalId: number;

  @Column({ type: "json", nullable: false })
  search: {
    city?: string;
    point?: {
      lat: string;
      lng: string;
    };
    radius?: string;
    language: string;
  };

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  eventDate: Date;

  @Column({ type: "bigint", nullable: false })
  userId: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, (user) => user.historical)
  @JoinColumn({ name: "userId", referencedColumnName: "userId" })
  user: User;
}
