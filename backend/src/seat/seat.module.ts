import { Module } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { SeatResolver } from "./seat.resolver";

@Module({
    
    providers: [SeatService, SeatResolver],
})
export class SeatModule{}