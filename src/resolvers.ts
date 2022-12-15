
import { AuthResolver } from "./resolvers/AuthResolver";
import { NonEmptyArray } from "type-graphql";

export const Resolvers = [
  AuthResolver,
] as NonEmptyArray<Function>;
