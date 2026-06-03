import { Injectable } from "@nestjs/common";
import {PrismaService } from "../../prisma/prisma.service";
import { Query, Args, Mutation, Resolver, ResolveProperty, ResolveField } from "@nestjs/graphql";
import { TripModel } from "./model/trip.model";
import { TripService } from "./trip.service";
import { SeatService } from "../seat/seat.service";
import { SeatModel } from "../seat/model/seat.model";
import { CreateTripInput } from "./dto/create.dto";
@Resolver()
export class TripResolver{
    constructor(
        private readonly tripService: TripService,
        private readonly seatService: SeatService
    ){}

    @Query(()=>TripModel)
    trip(@Args('id') id: number){
        return this.tripService.getById(id);
    }
    @Query(()=>[TripModel])
    trips(){
        return this.tripService.get();
    }
    @ResolveField(()=> SeatModel)
    seats(@Args('id') id: number){
        return this.seatService.getAllByTripId(id);
    }

    @Mutation(()=> TripModel)
    create(@Args('data') data: CreateTripInput){
        return this.tripService.create(data);
    }

    @Mutation(()=> TripModel)
    delete(@Args('id') id: number){
        return this.tripService.delete(id);
    }

}
