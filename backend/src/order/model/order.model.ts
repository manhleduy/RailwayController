import { ObjectType, Field } from "@nestjs/graphql";
import { OrderModel as MainModel } from "../../../generated/prisma/models";

@ObjectType()
export  class OrderModel implements MainModel{
    @Field()
    id!: number;

    @Field()
    customer_id!: string;
    
    @Field({nullable: true})
    staff_id!: string ;

    @Field()
    payment_method!: string;

    @Field()
    total_price!: number;

    @Field()
    status!: string;

    @Field()
    created_at!: Date;

    @Field()
    updated_at!: Date;

}