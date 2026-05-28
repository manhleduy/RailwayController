import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class LoginInput{
    @Field()
    id!: string;

    @Field()
    email!: string;

    
}