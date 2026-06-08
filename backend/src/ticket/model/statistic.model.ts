import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { SeatStatus } from "@prisma/client";

@ObjectType()
export class TicketSumModel{
    @Field()
    id!: number;
}
@ObjectType()
export class CustomerOrderSumModel{
    @Field()
    id!: number;
}

@ObjectType()
export class TicketStatisticModel{
    @Field()
    status!: SeatStatus;

    @Field()
    _count!: number;

    @Field()
    _sum!: number;


}