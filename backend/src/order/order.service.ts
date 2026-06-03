import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateOrderInput } from "./dto/create.dto";
import { StatisticModel } from "./model/statistic.model";
import { TicketService } from "../ticket/ticket.service";
import { UpdateOrderInput } from "./dto/update.dto";
import { OrderStatus, TicketStatus } from "@prisma/client";
@Injectable()
export class OrderService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly seatService: TicketService
    ){}
    async getAll(){
        return await this.prisma.order.findMany();
    }
    async findAllOrderByUserId(data: string){
        const orders = await this.prisma.order.findMany({
            where: {
                customer_id: data
            }
        });
        return orders;
    }
    async userOrderStatisticPerMonth(id: string, year: number){
        let statis =[1,2,3,4,5,6,7,8,9,10,11,12]

        return statis.map((i)=> this.prisma.order.aggregate({
            where: {
                customer_id: id,
                created_at: {
                    gte: new Date(year, i, 1),
                    lt: new Date(year, i + 1, 1)
                }
            },
            _sum:{
                total_price: true,
            },
            _count: {
                id: true,
            }
        }));
        
    
    }
    
    //create ordre and the array of the tickets in the same transaction
    async create(data: CreateOrderInput) {
        return await this.prisma.$transaction(async (tx) => {

            const order = await tx.order.create({
                data: {
                    customer_id: data.customer_id,
                    payment_method: data.payment_method,
                    total_price: data.tickets.length * 10000,
                    status: OrderStatus.Pending,
                }
            });

            await Promise.all(
                data.tickets.map((input: any) =>
                    tx.ticket.create({
                        data: {
                            pass_cccd: input.pass_cccd,
                            pass_name: input.pass_name,
                            order_id: order.id,
                            seat_id: input.seat_id,
                            price: 10000,
                            status: TicketStatus.Open
                        }
                    })
                )
            );

        });

        
    }
    async delete(id: number){
        return await this.prisma.order.delete({
            where:{
                id
            }
        })
    }
    async updateOrder(data: UpdateOrderInput){
        return this.prisma.order.update({
            where:{
                id: data.order_id
            },
            data:{
                staff_id: data.staff_id,
                status: data.status
            }
        })
    }
    
      
}
