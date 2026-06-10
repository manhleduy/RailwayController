import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";

@ObjectType()
export class StaffOrderCountModel{
    @Field()
    _all!: number;
}

@ObjectType()
export class StaffOrderStatisticModel{
    @Field()
    year!: number;

    @Field()
    month!: number;

    @Field()
    _count!: StaffOrderCountModel;

}