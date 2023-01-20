import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "OCORRENCIAS" })
@ObjectType()
export class Ocorrencias extends BaseEntity {
  
  @Field(() => ID)
  @PrimaryColumn("int")
  ID: number;

  @Field(() => Number, { nullable: true })
  @Column("integer")
  MOTIVO: number;

  @Field(() => String, { nullable: true })
  @Column("varchar")
  DESCRICAO: string;

  @Field(() => Number, { nullable: true })
  @Column("integer")
  ADOTANTE_ID: number;
}
