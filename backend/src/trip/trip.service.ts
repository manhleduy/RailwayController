import { Injectable } from "@nestjs/common";
import {PrismaService } from "../../prisma/prisma.service";
import { TripModel } from "../../generated/prisma/models";
@Injectable()
export class TripService{
    constructor(private readonly prisma: PrismaService){}

    get(){
        return this.prisma.trip.findMany();
    }
    getById(id: number){
        return this.prisma.trip.findFirst({
            where:{
                id
            }
        });
    }
    
    create(data: TripModel){
        return this.prisma.trip.create({
            data
        });
        
    }
    
}