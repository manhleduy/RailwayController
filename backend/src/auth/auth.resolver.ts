import { Resolver, Mutation, Args } from '@nestjs/graphql';

import {PrismaService} from '../../prisma/prisma.service';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.dto';
import { LoginInput } from './dto/login.dto';
import { LoginModel } from './model/login.model';
@Resolver(()=> LoginModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signup(@Args('input') input: SignupInput): Promise<String> {
    return this.authService.signup(input);
  }

  @Mutation(() => LoginModel)
  async login(@Args('input') input: LoginInput): Promise<LoginModel> {
    return this.authService.login(input);
  }
}
