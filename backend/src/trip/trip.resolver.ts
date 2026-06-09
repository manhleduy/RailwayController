import { Injectable } from "@nestjs/common";
import {PrismaService } from "../../prisma/prisma.service";
import { Query, Args, Mutation, Resolver, ResolveProperty, ResolveField, Parent } from "@nestjs/graphql";
import { TripModel } from "./model/trip.model";
import { TripService } from "./trip.service";
import { SeatService } from "../seat/service/seat.service";
import { SeatModel } from "../seat/model/seat.model";
import { CreateTripInput } from "./dto/create.dto";
import { SeatCountByStatusService } from "../seat/service/count.status.service";
import { SeatCountByClassService } from "../seat/service/count.class.service";
import { SeatStatusCountModel, SeatClassCountModel} from "../seat/model";
@Resolver(()=> TripModel)
export class TripResolver{
    constructor(
        private readonly tripService: TripService,
        private readonly seatService: SeatService,
        private readonly seatCountByStatusService: SeatCountByStatusService,
        private readonly seatCountByClassService: SeatCountByClassService
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
    
    @ResolveField(()=>[SeatStatusCountModel])
    async seatCountByStatus(@Parent() trip: TripModel){
        return await this.seatCountByStatusService.statisticsByTripId(trip.id);
    }
    @ResolveField(()=>[SeatClassCountModel])
    async seatCountByClass(@Parent() trip: TripModel){
        return await this.seatCountByClassService.statisticsByTripId(trip.id);
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
