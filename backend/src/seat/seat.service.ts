import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateSeatInput } from "./dto/create.dto";
@Injectable()
export class SeatService{
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
    create(data: CreateSeatInput) {
        this.prisma.seat.create({
            data: {
                ...data,
                status: "Available",
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

    
    }
    statisticsByTripId(trip_id: number){
        return this.prisma.seat.groupBy({
            by: ['status'],
            where: {
                trip_id: trip_id
            },
             
            _count:{
                id: true
            },
            _sum: {
                id: true
            }
        })
    }
    statistic(){
        return this.prisma.seat.groupBy({
            by: ['status'],
            _count:{
                id: true
            },
            _sum: {
                id: true
            }
        })
    }
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

    delete(id: number){
        return this.prisma.seat.delete({
            where:{
                id: id
            }
        })
    }
    

}