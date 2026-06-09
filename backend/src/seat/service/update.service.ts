import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class SeatUpdateService{
    constructor(private readonly prisma: PrismaService){}

    updateSeat(id: number, status: string){
        return this.prisma.seat.update({
            where: {
                id: id
            },
            data: {
                status: "Booked",
                updated_at: new Date()
            }
        });
    }
}