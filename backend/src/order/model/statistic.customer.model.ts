import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";


@ObjectType()
export class CustomerOrderStatisticModel{
    

    @Field()
    month!: number;

    @Field()
    _sum!: number

    @Field()
    _count!: number

}