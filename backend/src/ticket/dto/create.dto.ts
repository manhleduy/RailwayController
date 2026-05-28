import { Field, InputType } from "@nestjs/graphql";
import { IsInt } from "class-validator/types/decorator/typechecker/IsInt";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";

@InputType()
export class CreateTicketInput {
    @Field()
    @IsString()
    pass_cccd!: string;

    @Field()
    @IsString()
    pass_name!: string;

    @Field()
    @IsInt()    
    order_id!: number;

    @Field()
    @IsInt()
    seat_id!: number;
    
}