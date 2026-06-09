import { Module } from "@nestjs/common";
import { CustomerResolver } from "./customer.resolver";
import { CustomerService } from "./customer.service";
import { PrismaService } from "../../prisma/prisma.service";
import { TripService } from "../trip/trip.service";
import { OrderService } from "../order/order.service";
import { TicketService } from "../ticket/ticket.service";
import { SeatService } from "../seat/service/seat.service";
@Module({
    
    providers: [
        CustomerService, 
        CustomerResolver, 
        PrismaService,
        SeatService,
        OrderService,
        TicketService,
        TripService
    ],
})
export class CustomerModule{}