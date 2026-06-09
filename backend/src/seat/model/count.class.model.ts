import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { SeatStatus } from "@prisma/client";
import { SeatCountModel } from "./count.model";
@ObjectType()
export class SeatClassCountModel{
    @Field()
    status!: SeatStatus;

    @Field()
    _count!: SeatCountModel;

}