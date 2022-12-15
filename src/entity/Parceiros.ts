import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "CADPARC" })
@ObjectType()
export class Parceiros extends BaseEntity {
  
  @Field(() => ID)
  @PrimaryColumn("int")
  ID: number;

  @Field(() => Buffer)
  @Column("bytea", { nullable: true })
  AVATAR: Buffer;

  @Field(() => String, { nullable: true })
  @Column("varchar")
  BACKGROUND: string;

  @Field(() => String, { nullable: true })
  @Column("varchar")
  NOME: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  TELEFONE: string; 

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 100 })
  CNPJ: string; 

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

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  NUMERO: string;
}
