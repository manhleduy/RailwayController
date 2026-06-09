import { Module } from "@nestjs/common";
import { StaffService } from "./staff.service";
import { StaffResolver } from "./staff.resolver";
import { SeatService } from "../seat/service/seat.service";
import { TripService } from "../trip/trip.service";
import { OrderService } from "../order/order.service";
import { PrismaService } from "../../prisma/prisma.service";
import { TicketService } from "../ticket/ticket.service";
@Module({
     providers: [
          StaffService, 
          StaffResolver, 
          SeatService, 
          TripService, 
          OrderService, 
          PrismaService,
          TicketService
     ]
})
export class StaffModule{}
