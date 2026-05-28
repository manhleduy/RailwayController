import { InputType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { IsString } from "class-validator";
@InputType()
export class LoginInput{
    @Field()
    @IsString()
    id!: string
    
    @Field()
    @IsString()
    email!: string;



} 