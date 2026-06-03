import { Module } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { SeatResolver } from "./seat.resolver";
import { TicketService } from "../ticket/ticket.service";
import { PrismaService } from "../../prisma/prisma.service";
@Module({
    
    providers: [SeatService, SeatResolver, TicketService, PrismaService],
})
export class SeatModule{}