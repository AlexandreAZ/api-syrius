import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({ name: "ADOCAO" })
@ObjectType()
export class Adocao extends BaseEntity {
  
  @Field(() => ID)
  @PrimaryColumn("int")
  ID: number;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 255 })
  BACKGROUND: string;

  @Field(() => String, { nullable: true })
  @Column("varchar")
  ADOTANTE: string;

  @Field(() => Number, { nullable: true })
  @Column("integer")
  ADOTANTE_ID: number;

  @Field(() => String, { nullable: true })
  @Column("varchar")
  PET: string;

  @Field(() => Number, { nullable: true })
  @Column("integer")
  PET_ID: number;

  @Field(() => Date,  { nullable: true } )
  @Column("date")
  DTADOCAO: Date;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 60 })
  STATUS: string; 
  
  @Field(() => String, { nullable: true })
  @Column("varchar")
  ADOTANTE_ASS: string;
}
