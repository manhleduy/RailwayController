import { StatisticModel } from "./model/statistic.model";
import { OrderService } from "./order.service";
import {Mutation, Resolver, Query, Args} from "@nestjs/graphql";
import { OrderModel } from "./model/order.model";
@Resolver()
export class OrderResolver{
    constructor(private readonly orderService: OrderService){}

    @Query(()=>OrderModel)
    orders(@Args('id') id: string){
        return this.orderService.findAllOrderByUserId(id);
    }

    @Query(()=>[StatisticModel])
    statistic(@Args('id') id: string, @Args('year') year: number){
        return this.orderService.userOrderStatisticPerMonth(id, year);
    }
    
    

    



}