import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsString } from "class-validator";
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