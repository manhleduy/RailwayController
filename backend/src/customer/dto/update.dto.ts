import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCustomerInput{

    @Field()
    id!: string;

    @Field()
    full_name!: string;

    @Field()
    email!: string;

    @Field()
    phone!: string;

    
}