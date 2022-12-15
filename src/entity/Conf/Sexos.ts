import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "CONFSEXO" })
@ObjectType()
export class Sexos extends BaseEntity {
  
  @Field(() => ID)
  @PrimaryColumn("int")
  ID: number;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 255 })
  BACKGROUND: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 255 })
  DESCRICAO: string;

}
