import { Field, ID } from "type-graphql";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "USERS" })
export class Usuarios {

  @Field(() => ID)
  @PrimaryColumn("int")
  ID: number;
 
  @Column("varchar")
  USERNAME: string;

  @Column("varchar")
  PASSWORD: string; 

  @Column("int")
  TYPE: number;

  @Column("int")
  ENABLED: number;

  @Column("date")
  CREATED: Date;

  @Column("date")
  UPDATED: Date;
}
