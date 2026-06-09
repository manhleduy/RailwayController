import { ObjectType, Query, Field } from "@nestjs/graphql";

@ObjectType()
export class SeatModel{
    @Field()
    id!: number;

    @Field()
    status!: string;

    @Field()
    trip_id!: number;

    @Field()
    seat_class_id!: number;

    @Field()
    created_at!: Date;

    @Field()
    updated_at!: Date;


}