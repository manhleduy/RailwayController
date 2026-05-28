import { Field, InputType } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
@ObjectType()
export class CustomerModel{
    @Field()
    id!: string;

    @Field()
    full_name!: string;
    
    @Field()
    email!: string;

    @Field()
    phone!: string;

    @Field()
    password!: string;

    @Field()
    rank!: number;

    @Field()
    created_at!: Date;

    @Field()
    updated_at!: Date;

}