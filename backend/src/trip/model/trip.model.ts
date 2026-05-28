import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TripModel{
    @Field()
    id!: number;

    @Field()
    track!: string

    @Field()
    departure_station!: string

    @Field()
    arrival_station!: string

    @Field()
    ETD!: Date

    @Field()
    ETA!: Date
}