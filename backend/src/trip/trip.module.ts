import { Module } from "@nestjs/common";
import { TripService } from "./trip.service";
import { TripResolver } from "./trip.resolver";
import { OrderService } from "../order/order.service";
import { SeatService } from "../seat/seat.service";
import { PrismaService } from "../../prisma/prisma.service";
import { TicketService } from "../ticket/ticket.service";

@Module({
    
    providers: [
        TripService,
        TripResolver,  
        SeatService, 
        OrderService,
        PrismaService,
        TicketService
    ],
})
export class TripModule{}