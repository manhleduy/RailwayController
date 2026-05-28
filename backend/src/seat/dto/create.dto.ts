import { Field, InputType} from "@nestjs/graphql";
@InputType()
export class CreateSeatInput{
    @Field()
    trip_id!: number;
}