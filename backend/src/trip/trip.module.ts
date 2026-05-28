import { Module } from "@nestjs/common";
import { TripService } from "./trip.service";
import { TripResolver } from "./trip.resolver";



@Module({
    
    providers: [TripService, TripResolver],
})
export class TripModule{}