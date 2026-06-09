import { Module } from "@nestjs/common";
import {TicketService} from "./ticket.service";
import {TicketResolver} from "./ticket.resolver";
import { PrismaService } from "../../prisma/prisma.service";
import { OrderService } from "../order/order.service";
import { SeatService } from "../seat/service/seat.service";
@Module({
    
    providers: [
        TicketService,
        TicketResolver, 
        PrismaService, 
        OrderService, 
        SeatService
    ],
})
export class TicketModule{}