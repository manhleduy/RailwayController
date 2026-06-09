import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { PrismaService } from "../../prisma/prisma.service";
import { StaffService } from "./staff.service";
import { SeatService } from "../seat/service/seat.service";
import { OrderService } from "../order/order.service";
import { OrderModel } from "../order/model/order.model";
import { OrderStatus } from "@prisma/client";
import { UpdateOrderInput } from "./dto/model.update.dto";
import { SeatModel } from "../seat/model/seat.model";
import { CreateSeatInput } from "../seat/dto/create.dto";
import { SeatStatus } from "@prisma/client";

@Resolver()
export class StaffResolver{
    constructor(
        private readonly staffService: StaffService,
        private readonly orderService: OrderService,
        private readonly seatService: SeatService
    ){}

    



    @Mutation(()=> OrderModel)
    acceptOrder(@Args('data',{type: ()=> UpdateOrderInput} ) data: UpdateOrderInput){
        return this.orderService.updateOrder({order_id: data.order_id, staff_id: data.staff_id, status: OrderStatus.Confirmed});
    }

    @Mutation(()=> OrderModel)
    rejectOrder(@Args('data',{type: ()=> UpdateOrderInput} ) data: UpdateOrderInput){
        return this.orderService.updateOrder({order_id: data.order_id, staff_id: data.staff_id, status: OrderStatus.Denied});
    }
    @Mutation(()=> SeatModel)
    setSeatToAvailable(@Args('id', {type: ()=> Number}) id: number){
        return this.seatService.updateSeat(id, SeatStatus.Available );
    }
    @Mutation(()=> SeatModel)
    setSeatToBooked(@Args('id', {type: ()=> Number}) id: number){
        return this.seatService.updateSeat(id, SeatStatus.Booked );
    }
    @Mutation(()=> SeatModel)
    setSeatToUnavailable(@Args('id', {type: ()=> Number}) id: number){
        return this.seatService.updateSeat(id, SeatStatus.Unavailable ); 
    }

    @Mutation(()=> SeatModel)
    create(@Args('data', {type: ()=> CreateSeatInput}) data: CreateSeatInput){
        return this.seatService.create(data);
    }
    @Mutation(()=> SeatModel)
    delete(@Args('id', {type: ()=> Number}) id: number){
        return this.seatService.delete(id);
    }
    

}
