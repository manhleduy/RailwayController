import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CustomerService } from "./customer.service";
import { CustomerModel } from "./model/customer.model";

@Resolver()
export class CustomerResolver {
    constructor(private readonly customerService: CustomerService) {}

    @Query(() => CustomerModel)
    customer(@Args('id') id: string){
        return this.customerService.getbyId(id);
    }
    
    

    @Mutation(() => String)
    deleteCustomer(@Args('id') id: string){
        return this.customerService.delete(id);
    }    
    @Mutation(() => String)
    upRank(@Args('id') id: string){
        return this.customerService.upRank(id);
    }
    @Mutation(() => CustomerModel)
    updateInfor(
     @Args('id') id: string,
     @Args('full_name') full_name: string,
     @Args('email') email: string,
     @Args('phone') phone: string){
        return this.customerService.updateInfor(id, full_name, email, phone);
    }
    @Mutation(() => String)
    resetPassword(@Args('id') id: string, @Args('password') password: string){
        return this.customerService.resetPassword(id, password);
    }
    

}