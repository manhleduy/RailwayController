import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsString, MinLength } from "class-validator";
import { CreateInput } from "../../customer/dto/create.dto";

@InputType()
export class SignupInput extends CreateInput{
  

  @Field()
  @IsString()
  role!: string; // 'CUSTOMER' or 'STAFF'
}
