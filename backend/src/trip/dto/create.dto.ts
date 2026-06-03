import { Field, InputType } from "@nestjs/graphql";
import { IsDate } from "class-validator/types/decorator/typechecker/IsDate";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";

@InputType()
export class CreateTripInput{

    @Field()
    @IsString()
    track!: string

    @Field()
    @IsDate()
    ETD!: Date

    @Field()
    @IsDate()
    ETA!: Date

    @Field()
    @IsString()
    departure_station!: string

    @Field()
    @IsString()
    arrival_station!: string


}