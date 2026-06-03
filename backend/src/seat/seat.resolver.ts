import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { SeatService } from "./seat.service";
import { SeatModel } from "./model/seat.model";
import { PrismaService } from "../../prisma/prisma.service";
import { TicketService } from "../ticket/ticket.service";
import { TicketModel } from "../ticket/model/ticket.model";
import { SeatStatus } from "@prisma/client";
import { CreateSeatInput } from "./dto/create.dto";
@Resolver()
export class SeatResolver{
    constructor(
        private readonly seatService: SeatService,
        private readonly ticketService: TicketService
    ){}

    @Query(()=> SeatModel)
    seat(@Args('id') id: number){
        return this.seatService.get(id);
    }
    @Query(()=>[SeatModel])
    seats(@Args('trip_id') trip_id: number){
        return this.seatService.getAllByTripId(trip_id);
    }


    @Query(()=> TicketModel)
    ticket(@Args('id') id: number){
        return this.ticketService.findBySeatId(id);
    }

    
    @Mutation(()=> SeatModel)
    setSeatToAvailable(@Args('id') id: number){
        return this.seatService.updateSeat(id, SeatStatus.Available );
    }
    @Mutation(()=> SeatModel)
    setSeatToBooked(@Args('id') id: number){
        return this.seatService.updateSeat(id, SeatStatus.Booked );
    }
    @Mutation(()=> SeatModel)
    setSeatToUnavailable(@Args('id') id: number){
        return this.seatService.updateSeat(id, SeatStatus.Unavailable ); 
    }

    @Mutation(()=> SeatModel)
    create(@Args('data') data: CreateSeatInput){
        return this.seatService.create(data);
    }
    @Mutation(()=> SeatModel)
    delete(@Args('id') id: number){
        return this.seatService.delete(id);
    }

}