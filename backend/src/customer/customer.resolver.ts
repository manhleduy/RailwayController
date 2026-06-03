import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CustomerService } from "./customer.service";
import { CustomerModel } from "./model/customer.model";
import { OrderModel } from "../order/model/order.model";
import { OrderService } from "../order/order.service";
import { CreateOrderInput } from "../order/dto/create.dto";
import { UpdateTicketInput } from "../ticket/dto/update.dto";
import { TicketModel } from "../ticket/model/ticket.model";
import { TicketService } from "../ticket/ticket.service";
import { CreateTicketInput } from "../ticket/dto/create.dto";
import { UpdateCustomerInput } from "./dto/update.dto";
@Resolver()
export class CustomerResolver {
    constructor(
        private readonly customerService: CustomerService,
        private readonly orderService: OrderService,
        private readonly ticketService: TicketService
    ) {}

    @Query(() => CustomerModel)
    customer(@Args('id') id: string){
        return this.customerService.getbyId(id);
    }
    


    @Query(()=> [OrderModel])
    orders(@Args('id') id: string){
        return this.orderService.findAllOrderByUserId(id);
    }
    


    @Mutation(()=> OrderModel)
    deleteOrder(@Args('order_id') order_id: number){
        return this.orderService.delete(order_id);
    }

    @Mutation(()=>OrderModel)
    createOrder(@Args('data') data: CreateOrderInput){
        
        return this.orderService.create(data);
    }


    @Mutation(()=>TicketModel)
    updateTicket(@Args('data') data: UpdateTicketInput){
        
        return this.ticketService.updateOne(data);
    }
    @Mutation(()=> TicketModel)
    addTicketToOrder(@Args('data') data: CreateTicketInput){
        return this.ticketService.create(data);
    }
    @Mutation(()=> TicketModel)
    removeTicketFromOrder(@Args('id') id: number){
        return this.ticketService.deleteOne(id);
    }


    

    @Mutation(() => String)
    delete(@Args('id') id: string){
        return this.customerService.delete(id);
    }    
    @Mutation(() => String)
    upRank(@Args('id') id: string){
        return this.customerService.upRank(id);
    }
    

    @Mutation(() => CustomerModel)
    updateInfor(@Args('data') data: UpdateCustomerInput){
        return this.customerService.updateInfor(data);
    }
    @Mutation(() => String)
    resetPassword(@Args('id') id: string, @Args('password') password: string){
        return this.customerService.resetPassword(id, password);
    }
    

}