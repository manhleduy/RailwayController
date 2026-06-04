import { Query, Resolver, Args, Mutation, Parent, ResolveField } from "@nestjs/graphql";
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
    seat(@Args('id', {type: ()=> Number}) id: number){
        return this.seatService.get(id);
    }
    @Query(()=>[SeatModel])
    seats(@Args('trip_id', {type: ()=> Number}) trip_id: number){
        return this.seatService.getAllByTripId(trip_id);
    }



    @ResolveField(()=> TicketModel)
    ticket(@Parent() seat: SeatModel){
        return this.ticketService.findBySeatId(seat.id);
    }


 
    
    

}