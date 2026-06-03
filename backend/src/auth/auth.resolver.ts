import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import {PrismaService} from '../../prisma/prisma.service';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.dto';
import { LoginInput } from './dto/login.dto';
import { LoginModel } from './model/login.model';
import {CustomerService} from '../customer/customer.service';
import { StaffService } from '../staff/staff.service';
import * as brcypt from 'bcrypt';
@Resolver(()=> LoginModel)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
    private readonly staffService: StaffService,
  ) {}

  @Query(()=>LoginModel)
  async login(@Args('input', {type: ()=> LoginInput}) input: LoginInput){
    
      const {role} = input;
      let user: LoginModel | null;
      if(role === 'CUSTOMER'){
        user =await  this.customerService.login(input);
      }else if(role === 'STAFF'){
        user =await this.staffService.login(input);
      }else{
        throw new Error('Invalid role');
      }
      if(!user){
        throw new Error('User not found');
      }
      if(!brcypt.compare(input.password, user.password)){
        throw new Error("Invalid password");
        
      }
      return user;
  }

  @Mutation(()=> LoginModel)
  async signup(@Args('input', {type: ()=> SignupInput}) input: SignupInput){
    const {role} = input;
    if (role === 'CUSTOMER') {
      return this.customerService.create(input);
    } else if (role === 'STAFF') {
      return this.staffService.create(input);
    } else {
      throw new Error('Invalid role');
    }
    
  }

  



  
}
