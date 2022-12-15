import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "CADEST" })
@ObjectType()
export class Estabelecimentos extends BaseEntity {
  
  @Field(() => ID)
  @PrimaryColumn("int")
  ID: number;

  @Field(() => String, { nullable: true })
  @Column("varchar")
  BACKGROUND: string;

  @Field(() => String, { nullable: true })
  @Column("varchar")
  NOME: string;
}
