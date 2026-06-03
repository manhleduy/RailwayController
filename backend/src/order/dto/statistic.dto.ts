import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class StatisticInput{
    @Field()
    @IsString()
    year!: number;
    
    @Field()
    @IsString()
    id!: string;
}