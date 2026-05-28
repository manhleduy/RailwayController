import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsString, MinLength } from "class-validator";

@InputType()
export class LoginInput{
    @Field()
    @IsString()
    id!: string;
    
    @Field()
    @IsString()
    email!: string;

    @Field()
    @IsString()
    password!: string;

    @Field()
    @IsString()
    role!: string; // 'CUSTOMER' or 'STAFF'
    
}