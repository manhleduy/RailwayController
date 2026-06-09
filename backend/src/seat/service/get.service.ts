import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

export class SeatGetService{
    constructor(private readonly prisma: PrismaService){}
    
        get(id: number){
            return this.prisma.seat.findFirst({
                where: {
                    id: id
                }
            });
    
        }
        getAllByTripId(trip_id: number){
            return this.prisma.seat.findMany({
                where:{
                    trip_id: trip_id
                }
            })
        }
}