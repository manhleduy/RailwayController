import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../../prisma/prisma.service";
import { Query } from "@nestjs/common";
import { StaffService } from "./staff.service";
import { SeatService } from "../seat/seat.service";
import { OrderService } from "../order/order.service";
import { OrderModel } from "../order/model/order.model";
import { OrderStatus } from "@prisma/client";
@Resolver()
export class StaffResolver{
    constructor(
        private readonly staffService: StaffService,
        private readonly orderService: OrderService,
        private readonly seatService: SeatService
    ){}

    @Query(() => [OrderModel])
    orders(){
        return this.orderService.getAll();
    }



    @Mutation(()=> OrderModel)
    acceptOrder(@Args('data') data: {order_id: number, staff_id: string}){
        return this.orderService.updateOrder({order_id: data.order_id, staff_id: data.staff_id, status: OrderStatus.Confirmed});
    }

    @Mutation(()=> OrderModel)
    rejectOrder(@Args('data') data: {order_id: number, staff_id: string}){
        return this.orderService.updateOrder({order_id: data.order_id, staff_id: data.staff_id, status: OrderStatus.Denied});
    }
    

}