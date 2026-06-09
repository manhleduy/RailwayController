import { Module } from "@nestjs/common";
import { SeatClassService } from "./seatclass.service";
import { SeatClassResolver } from "./seatclass.resolver";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
    providers: [SeatClassService, SeatClassResolver, PrismaService],
})
export class SeatClassModule{}