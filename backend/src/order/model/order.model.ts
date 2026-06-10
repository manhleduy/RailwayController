import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export  class OrderModel{
    @Field()
    id!: number;

    @Field()
    customer_id!: string;
    
    @Field({nullable: true})
    staff_id!: string ;

    @Field()
    payment_method!: string;



    @Field()
    status!: string;

    @Field()
    created_at!: Date;

    @Field()
    updated_at!: Date;

}