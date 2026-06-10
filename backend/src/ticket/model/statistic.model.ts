import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { SeatStatus } from "@prisma/client";



@ObjectType()
export class TicketStatisticModel{


    @Field({nullable: true})
    _count?: number;

    @Field({nullable: true})
    _sum?: number;


}