import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AcceptOrderInput{
    @Field()
    order_id!: number;

    @Field()
    staff_id!: string;
}