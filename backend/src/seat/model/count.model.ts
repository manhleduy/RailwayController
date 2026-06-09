import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { SeatStatus } from "@prisma/client";

@ObjectType()
export class SeatCountModel{
    @Field()
    _all!: number;
}