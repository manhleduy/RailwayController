import { Module } from "@nestjs/common";
import { TripService } from "./trip.service";
import { TripResolver } from "./trip.resolver";
import { OrderService } from "../order/order.service";
import { SeatService } from "../seat/service/seat.service";
import { PrismaService } from "../../prisma/prisma.service";
import { TicketService } from "../ticket/ticket.service";
import { SeatCountByStatusService } from "../seat/service/count.status.service";
import { SeatCountByClassService } from "../seat/service/count.class.service";

@Module({
    
    providers: [
        TripService,
        TripResolver,  
        SeatService, 
        OrderService,
        PrismaService,
        TicketService,
        SeatCountByStatusService,
        SeatCountByClassService
    ],
})
export class TripModule{}