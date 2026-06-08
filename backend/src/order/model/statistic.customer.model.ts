import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";

@ObjectType()
export class CustomerOrderCountModel{
    @Field()
    id!: number;
}
@ObjectType()
export class CustomerOrderSumModel{
    @Field()
    id!: number;
}

@ObjectType()
export class CustomerOrderStatisticModel{
    @Field()
    year!: number;

    @Field()
    month!: number;

    @Field()
    _sum!: CustomerOrderSumModel;

    @Field()
    _count!: CustomerOrderCountModel;

}