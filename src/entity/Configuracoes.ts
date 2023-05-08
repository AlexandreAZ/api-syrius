import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "CLIENTES" })
@ObjectType()
export class Configuracoes extends BaseEntity {
  @Field(() => ID) 
  @PrimaryColumn("int")
  ID: number;

  @Field(() => String)
  @Column("varchar")
  ACESSOS: string; 
}
