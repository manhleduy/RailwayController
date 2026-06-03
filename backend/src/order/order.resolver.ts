import { StatisticModel } from "./model/statistic.model";
import { OrderService } from "./order.service";
import {Mutation, Resolver, Query, Args} from "@nestjs/graphql";
import { OrderModel } from "./model/order.model";
import { StatisticInput } from "./dto/statistic.dto";
@Resolver()
export class OrderResolver{
    constructor(private readonly orderService: OrderService){}

    @Query(()=>OrderModel)
    orders(@Args('id', {type: ()=> String}) id: string){
        return this.orderService.findAllOrderByUserId(id);
    }

    @Query(()=>[StatisticModel])
    statistic(@Args('data', {type: ()=> StatisticInput}) data: StatisticInput){
        return this.orderService.userOrderStatisticPerMonth(data.id, data.year);
    }
    
    

    



}