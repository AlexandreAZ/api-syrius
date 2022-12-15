import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "CADPET" })
@ObjectType()
export class Cadastro extends BaseEntity {
  
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
  @Column("varchar")
  PAI: string;

  @Field(() => String, { nullable: true })
  @Column("varchar")
  MAE: string;

  @Field(() => Number, { nullable: true })
  @Column("int")
  TIPO: number;

  @Field(() => Number, { nullable: true })
  @Column("int")
  RACA: number;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 10 })
  CASTRADO: string;

  @Field(() => String, { nullable: true } )
  @Column("date")
  NASCIMENTO: String;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 10 })
  ADOTADO: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  COR: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  OLHOS: string;

  @Field(() => Number, { nullable: true })
  @Column("int")
  PELAGEM: number;

  @Field(() => Number, { nullable: true })
  @Column("int")
  PORTE: number;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  TEMPERAMENTO: string; 

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 10 })
  FALECIDO: string; 

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 30 })
  STATUS: string; 
}
