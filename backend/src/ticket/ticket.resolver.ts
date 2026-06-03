import { Resolver, Query, Args } from "@nestjs/graphql";
import { TicketService } from "./ticket.service";
import { TicketModel } from "./model/ticket.model";

@Resolver()
export class TicketResolver {
    constructor(private readonly ticketService: TicketService){}
    @Query(()=> TicketModel)
    ticket(@Args('id') id: number){
        return this.ticketService.findById(id);
    
    }
    @Query(()=> [TicketModel])
    tickets(@Args('orderId') orderId: number){
        return this.ticketService.findAllByOrderId(orderId);
    }
    
    




}   