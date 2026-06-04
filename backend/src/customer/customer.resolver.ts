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
import { ResetPasswordInput } from "./dto/resetpassword.dto";
@Resolver()
export class CustomerResolver {
    constructor(
        private readonly customerService: CustomerService,
        private readonly orderService: OrderService,
        private readonly ticketService: TicketService
    ) {}

    @Query(() => CustomerModel)
    customer(@Args('id', {type: ()=> String}) id: string){
        return this.customerService.getbyId(id);
    }
    


    @Query(()=> [OrderModel], { name: 'customerOrders' })
    orders(@Args('id', {type: ()=> String}) id: string){
        return this.orderService.findAllOrderByUserId(id);
    }
    

    @Mutation(()=> OrderModel)
    createOrder(@Args('data', {type: ()=> CreateOrderInput}) data: CreateOrderInput){
        return this.orderService.create(data);
    }
    

    @Mutation(()=> OrderModel)
    deleteOrder(@Args('order_id', {type: ()=> Number}) order_id: number){
        return this.orderService.delete(order_id);
    }


    @Mutation(()=>TicketModel)
    updateTicket(@Args('data', {type: ()=> UpdateTicketInput}) data: UpdateTicketInput){
        
        return this.ticketService.updateOne(data);
    }
    @Mutation(()=> TicketModel)
    addTicketToOrder(@Args('data', {type: ()=> CreateTicketInput}) data: CreateTicketInput){
        return this.ticketService.create(data);
    }
    @Mutation(()=> TicketModel)
    removeTicketFromOrder(@Args('id', {type: ()=> Number}) id: number){
        return this.ticketService.deleteOne(id);
    }

    


    

    @Mutation(() => String)
    delete(@Args('id', {type: ()=> String}) id: string){
        return this.customerService.delete(id);
    }    
    @Mutation(() => String)
    upRank(@Args('id', {type: ()=> String}) id: string){
        return this.customerService.upRank(id);
    }
    

    @Mutation(() => CustomerModel)
    updateInfor(@Args('data', {type: ()=> UpdateCustomerInput}) data: UpdateCustomerInput){
        return this.customerService.updateInfor(data);
    }
    @Mutation(() => String)
    resetPassword(@Args('data', {type: ()=> ResetPasswordInput}) data: ResetPasswordInput){
        return this.customerService.resetPassword(data.id, data.password);
    }
    

}
