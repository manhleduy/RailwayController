import {ObjectType} from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
@ObjectType()
export class SeatClassModel{
    @Field()
    id!: number;

    @Field()
    name!: string;

    @Field()
    price!: number;
}