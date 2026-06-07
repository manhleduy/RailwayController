import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { SeatStatus } from "@prisma/client";
@ObjectType()
export class TicketStatisticModel{
    @Field()
    status!: SeatStatus;

    @Field()
    _count!: number;

    @Field()
    _sum!: number;


}