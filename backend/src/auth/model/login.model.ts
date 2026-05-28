import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModel {
  @Field()
  id!: string;

  @Field()
  full_name!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;

  @Field()
  password!: string;

}
