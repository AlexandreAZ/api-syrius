import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "CONFRACA" })
@ObjectType()
export class Racas extends BaseEntity {
  
  @Field(() => ID)
  @PrimaryColumn()
  ID: number;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 255 })
  BACKGROUND: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 255 })
  DESCRICAO: string;

}
