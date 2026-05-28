import { InputType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
@InputType()
export class UpdateTicketInput{
    @Field()
    id!: number;

    @Field({nullable: true})
    pass_cccd?: string;
    
    @Field({nullable: true})
    pass_name?: string;
    
    @Field({nullable: true})
    order_id?: number;
    
    @Field({nullable: true})
    seat_id?: number; 
}