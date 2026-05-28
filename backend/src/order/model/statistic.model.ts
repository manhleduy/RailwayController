import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
@ObjectType()
export class StatisticModel{
    @Field()
    year!: number;

    @Field()
    month!: number;

    @Field()
    _sum!: number;

    @Field()
    _count!: number;

}