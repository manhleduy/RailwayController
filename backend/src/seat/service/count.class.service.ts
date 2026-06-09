import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class SeatCountByClassService{
    constructor(private readonly prisma: PrismaService){}
     statisticsByTripId(trip_id: number){
        return this.prisma.seat.groupBy({
            by: ['seat_class_id'],
            where: {
                trip_id: trip_id
            },
             
            _count:{
                _all: true
            }
        })
    }
    statistic(){
        return this.prisma.seat.groupBy({
            by: ['seat_class_id'],
            _count:{
                _all: true
            }
        })
    }
}