import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity({name: "USERS" })
@ObjectType()
export class Auth extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  ID: number;

  @Field(() => String)
  @Column("varchar", { length: 120 })
  USERNAME: string;

  @Field(() => String)
  @Column("varchar", { length: 100 })
  PASSWORD: string;

  @Field(() => Number)
  @Column("int")
  ENABLED: number;

  @Field(() => Number)
  @Column("int")
  TYPE: number;

  @Field(() => Date)
  @Column({ type: "date" })
  CREATED: Date;

  @Field(() => Date)
  @Column({ type: "date" })
  UPDATED: Date;
}

@ObjectType()
export class AuthSuccess extends BaseEntity {
  @Field(() => String)
  USERNAME: string;

  @Field(() => String)
  TOKEN: string;

  @Field(() => String)
  BIN: string;

  @Field(() => String)
  SHOPCODE: string;
}
