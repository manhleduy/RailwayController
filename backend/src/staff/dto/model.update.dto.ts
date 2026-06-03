import { Field, InputType, Query } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class UpdateOrderInput{
    @Field()
    @IsString()
    order_id!: number;

    @Field()
    @IsString()
    staff_id!: string;



}