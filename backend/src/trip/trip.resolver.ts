import { Injectable } from "@nestjs/common";
import {PrismaService } from "../../prisma/prisma.service";
import { Query, Args, Mutation, Resolver, ResolveProperty, ResolveField, Parent } from "@nestjs/graphql";
import { TripModel } from "./model/trip.model";
import { TripService } from "./trip.service";
import { SeatService } from "../seat/seat.service";
import { SeatModel } from "../seat/model/seat.model";
import { CreateTripInput } from "./dto/create.dto";
import { SeatStatisticModel } from "../seat/model/statistic.model";
@Resolver(()=> TripModel)
export class TripResolver{
    constructor(
        private readonly tripService: TripService,
        private readonly seatService: SeatService
    ){}

    @Query(()=>TripModel)
    trip(@Args('id', {type: ()=> Number}) id: number){
        return this.tripService.getById(id);
    }

    @Query(()=>[TripModel])
    trips(){
        return this.tripService.get();
    }
    
    @ResolveField(()=> SeatModel)
    seats(@Parent() trip: TripModel){
        return this.seatService.getAllByTripId(trip.id);
    }
    @ResolveField(()=>[SeatStatisticModel])
    async seatStatistic(@Parent() trip: TripModel){
        
        const temp = await this.seatService.statisticsByTripId(trip.id);
        console.log(temp);
        return temp;
    }

    @Mutation(()=> TripModel)
    create(@Args('data', {type: ()=> CreateTripInput}) data: CreateTripInput){
        return this.tripService.create(data);
    }

    @Mutation(()=> TripModel)
    delete(@Args('id', {type: ()=> Number}) id: number){
        return this.tripService.delete(id);
    }

}
