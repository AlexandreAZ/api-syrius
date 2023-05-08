import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "MODULOS" })
@ObjectType()
export class Modulos extends BaseEntity {
  @Field(() => ID) 
  @PrimaryColumn("int")
  ID: number;

  @Field(() => String)
  @Column("varchar")
  NOME: string;

  @Field(() => String)
  @Column("int")
  ENABLED: number; 
}
