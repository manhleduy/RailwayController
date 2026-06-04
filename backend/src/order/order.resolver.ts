import { StatisticModel } from "./model/statistic.model";
import { OrderService } from "./order.service";
import { Resolver, Query, Args, Parent, ResolveField} from "@nestjs/graphql";
import { OrderModel } from "./model/order.model";
import { StatisticInput } from "./dto/statistic.dto";
import { TicketService } from '../ticket/ticket.service'
import { TicketModel } from "../ticket/model/ticket.model";
import { StatisticModel  as TicketStatisticModel} from "../ticket/model/statistic.model";
@Resolver()
export class OrderResolver{
    constructor(
        private readonly orderService: OrderService,
        private readonly ticketService: TicketService
    ){}

    @Query(()=> [OrderModel])
    allOrders(){
        return this.orderService.getAll();
    }
    @Query(()=>[OrderModel], { name: 'ordersByCustomerId' })
    orders(@Args('id', {type: ()=> String}) id: string){
        return this.orderService.findAllOrderByUserId(id);
    }

    @ResolveField(()=>[TicketModel])
    tickets(@Parent() order: OrderModel){
        return this.ticketService.findAllByOrderId(order.id);
    }
    @ResolveField(()=> TicketStatisticModel)
    ticketStatistic(@Parent() order: OrderModel){
        return this.ticketService.statisticWithOrderId(order.id);
    }
    

    @Query(()=>[StatisticModel])
    statistic(@Args('data', {type: ()=> StatisticInput}) data: StatisticInput){
        return this.orderService.userOrderStatisticPerMonth(data.id, data.year);
    }
    
    

    



}
