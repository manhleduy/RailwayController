import { Resolver, Query, Args } from "@nestjs/graphql";
import { TicketService } from "./ticket.service";
import { TicketModel } from "./model/ticket.model";

@Resolver(() => TicketModel)
export class TicketResolver {
    constructor(private readonly ticketService: TicketService){}
    @Query(()=> TicketModel)
    ticket(@Args('id', {type: ()=> Number}) id: number){
        return this.ticketService.findById(id);
    
    }
    @Query(()=> [TicketModel])
    tickets(@Args('orderId', {type: ()=> Number}) orderId: number){
        return this.ticketService.findAllByOrderId(orderId);
    }
    
    




}   