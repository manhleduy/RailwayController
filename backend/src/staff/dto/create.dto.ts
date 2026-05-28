import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";
@InputType()
export class CreateInput{
    @Field()
    @IsString()
    id!: string;
    
    @Field()
    @IsString()
    full_name!: string;
    
    @Field()
    @IsString()
    email!: string;
    
    @Field()
    @IsString()
    phone!: string;
    
    @Field()
    @IsString()
    password!: string;
}