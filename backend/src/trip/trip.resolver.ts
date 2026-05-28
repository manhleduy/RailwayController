import { Injectable } from "@nestjs/common";
import {PrismaService } from "../../prisma/prisma.service";
import { Query, Args, Mutation } from "@nestjs/graphql";
import { TripModel } from "./model/trip.model";
@Injectable()
export class TripResolver{
    constructor(private readonly prisma: PrismaService){}

    @Query(()=>TripModel)
    trip(@Args('id') id: number){
        return this.prisma.trip.findFirst({
            where: {
                id
            }
        });
    }
    @Query(()=>[TripModel])
    trips(){
        return this.prisma.trip.findMany();
    }

    @Mutation(()=> TripModel)
    createTrip(@Args('data') data: TripModel){
        return this.prisma.trip.create({
            data
        });
    }

}
