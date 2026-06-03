import { Field, InputType } from "@nestjs/graphql";
import { OrderStatus } from "@prisma/client";
import { IsString } from "class-validator";

@InputType()
export class UpdateOrderInput{
    @Field()
    @IsString()
    order_id!: number;

    @Field()
    @IsString()
    staff_id!: string;

    @Field()
    @IsString()
    status!: OrderStatus;
}