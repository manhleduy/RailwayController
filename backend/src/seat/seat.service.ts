import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateSeatInput } from "./dto/create.dto";
@Injectable()
export class SeatService{
    constructor(private readonly prisma: PrismaService){}

    async get(id: number){
        return await this.prisma.seat.findFirst({
            where: {
                id: id
            }
        });

    }
    async getAllByTripId(trip_id: number){
        return await this.prisma.seat.findMany({
            where:{
                trip_id: trip_id
            }
        })
    }
    async create(data: CreateSeatInput) {
        return await this.prisma.seat.create({
            data: {
                ...data,
                status: "Available",
                created_at: new Date(),
                updated_at: new Date(),
                seat_number: `A${Math.floor(Math.random() * 10000)}`
            }
        });

    
    }
    async updateSeat(id: number, status: string){
        return await this.prisma.seat.update({
            where: {
                id: id
            },
            data: {
                status: "Booked",
                updated_at: new Date()
            }
        });
    }

    async delete(id: number){
        return await this.prisma.seat.delete({
            where:{
                id: id
            }
        })
    }
    

}