import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsString } from "class-validator";
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