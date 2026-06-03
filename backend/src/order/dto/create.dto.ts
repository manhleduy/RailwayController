import { Field, InputType } from "@nestjs/graphql";
import { CreateTicketInput } from "../../ticket/dto/create.dto";

@InputType()
export class CreateOrderInput{
    @Field()
    customer_id!: string;
    
    @Field(() => [CreateTicketInput], { nullable: true })
    tickets!: CreateTicketInput[];

    @Field()
    payment_method!: string;

    
}
