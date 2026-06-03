import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { PrismaService } from "../../prisma/prisma.service";
import { StaffService } from "./staff.service";
import { SeatService } from "../seat/seat.service";
import { OrderService } from "../order/order.service";
import { OrderModel } from "../order/model/order.model";
import { OrderStatus } from "@prisma/client";
import { UpdateOrderInput } from "./dto/model.update.dto";
@Resolver()
export class StaffResolver{
    constructor(
        private readonly staffService: StaffService,
        private readonly orderService: OrderService,
        private readonly seatService: SeatService
    ){}

    @Query(() => [OrderModel], { name: 'allOrders' })
    orders(){
        return this.orderService.getAll();
    }



    @Mutation(()=> OrderModel)
    acceptOrder(@Args('data',{type: ()=> UpdateOrderInput} ) data: UpdateOrderInput){
        return this.orderService.updateOrder({order_id: data.order_id, staff_id: data.staff_id, status: OrderStatus.Confirmed});
    }

    @Mutation(()=> OrderModel)
    rejectOrder(@Args('data',{type: ()=> UpdateOrderInput} ) data: UpdateOrderInput){
        return this.orderService.updateOrder({order_id: data.order_id, staff_id: data.staff_id, status: OrderStatus.Denied});
    }
    

}
