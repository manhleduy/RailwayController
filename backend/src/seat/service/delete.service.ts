import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

export class SeatDeleteService{
    constructor(private readonly prisma: PrismaService){}
    deleteSeat(id: number){
        return this.prisma.seat.delete({
            where: {
                id: id
            }
        });
    }
}