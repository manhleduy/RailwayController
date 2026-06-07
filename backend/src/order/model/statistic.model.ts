import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
@ObjectType()
export class OrderStatisticModel{
    @Field()
    year!: number;

    @Field()
    month!: number;

    @Field()
    _sum!: number;

    @Field()
    _count!: number;

}