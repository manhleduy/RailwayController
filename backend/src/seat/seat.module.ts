import { Module } from "@nestjs/common";
import { SeatService } from "./service/seat.service";
import { SeatResolver } from "./seat.resolver";
import { TicketService } from "../ticket/ticket.service";
import { PrismaService } from "../../prisma/prisma.service";
import { SeatClassModel } from "../seatclass/model/seatclass.model";
import { SeatClassResolver } from "../seatclass/seatclass.resolver";
import { SeatClassService } from "../seatclass/seatclass.service";
import { SeatGetService } from "./service/get.service";
import { SeatCreateService } from "./service/create.service";
import { SeatDeleteService } from "./service/delete.service";

import { SeatUpdateService } from "./service/update.service";
@Module({
    
    providers: [
        SeatService,
        SeatResolver, 
        TicketService, 
        PrismaService,
        SeatClassService,
        SeatClassResolver,
        SeatGetService,
        SeatCreateService,
        SeatDeleteService,
        SeatUpdateService,
    ],
})
export class SeatModule{}