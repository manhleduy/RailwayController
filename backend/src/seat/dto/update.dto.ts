import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateSeatInput{
    @Field()
    id!: number;

    @Field({nullable: true})
    status?: string;

}