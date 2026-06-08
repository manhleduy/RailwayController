import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";

@ObjectType()
export class CustomerOrderCountModel{
    @Field()
    id!: number;
}

@ObjectType()
export class StaffOrderStatisticModel{
    @Field()
    year!: number;

    @Field()
    month!: number;

    @Field()
    _count!: CustomerOrderCountModel;

}