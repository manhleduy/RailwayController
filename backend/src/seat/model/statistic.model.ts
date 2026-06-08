import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { SeatStatus } from "@prisma/client";

@ObjectType()
export class SeatCountModel{
    id!: number;
}
@ObjectType()
export class SeatSumModel{
    @Field()
    id!: number;
}

@ObjectType()
export class SeatStatisticModel{
    @Field()
    status!: SeatStatus;

    @Field()
    _count!: SeatCountModel;

    @Field()
    _sum!: SeatSumModel;



}