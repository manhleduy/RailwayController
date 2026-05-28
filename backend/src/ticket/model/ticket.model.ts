import { ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
@ObjectType()
export class TicketModel{
    @Field()
    id!: string;

    @Field()
    pass_cccd!: string;

    @Field()
    pass_name!: string;

    @Field()
    order_id!: number;

    @Field()
    seat_id!: number;

    @Field()
    status!: string;

    @Field()
    price!: number;

    @Field()
    created_at!: Date;
    
    @Field()
    updated_at!: Date;

}