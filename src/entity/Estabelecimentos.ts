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

  @Field(() => String, { nullable: true })
  @Column("varchar")
  RESPONSAVEL: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 100 })
  CPFCNPJ: string; 

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  CEP: string; 

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  ENDERECO: string; 

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  CIDADE: string; 

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  BAIRRO: string; 

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 10 })
  UF: string; 
}
