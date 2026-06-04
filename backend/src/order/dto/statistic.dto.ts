import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsString } from "class-validator";
import {Type} from "class-transformer";

@InputType()
export class StatisticInput {
  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  year!: number;

  @Field()
  @IsString()
  id!: string;
}