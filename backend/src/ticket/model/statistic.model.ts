import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { SeatStatus } from "../../../generated/prisma/client";
@ObjectType()
export class StatisticModel{
    @Field()
    status!: SeatStatus;

    @Field()
    _count!: number;

    @Field()
    _sum!: number;


}