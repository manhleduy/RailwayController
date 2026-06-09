import { Injectable } from "@nestjs/common";
import {PrismaService} from '../../../prisma/prisma.service';
import { CreateSeatInput } from "../dto";

export class SeatCreateService{
    constructor(private readonly prisma: PrismaService){}
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
}