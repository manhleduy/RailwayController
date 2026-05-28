import { Field, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";
import { CreateTicketInput } from "../../ticket/dto/create.dto";

@InputType()
export class CreateOrderInput{
    @Field()
    customer_id!: string;
    
    @Field({nullable: true})
    tickets!: CreateTicketInput[];

    @Field()
    payment_method!: string;

    
}