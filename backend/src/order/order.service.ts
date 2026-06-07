import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateOrderInput } from "./dto/create.dto";
import { UpdateOrderInput } from "./dto/update.dto";
import { OrderStatus, TicketStatus } from "@prisma/client";
@Injectable()
export class OrderService {

    constructor(
        private readonly prisma: PrismaService,
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
        const months = Array.from({ length: 12 }, (_, index) => index + 1);

        return Promise.all(
            months.map(async (month) => {
                const aggregate = await this.prisma.order.aggregate({
                    where: {
                        customer_id: id,
                        created_at: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1)
                        }
                    },
                    _sum:{
                        total_price: true,
                    },
                    _count: {
                        id: true,
                    }
                });

                return {
                    year,
                    month,
                    _sum: aggregate._sum.total_price ?? 0,
                    _count: aggregate._count.id ?? 0
                };
            })
        );
    }

    async create(data: CreateOrderInput) {
        const timestamp = new Date();

        return await this.prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    customer_id: data.customer_id,
                    payment_method: data.payment_method,
                    total_price: (data.tickets?.length ?? 0) * 10000,
                    status: OrderStatus.Pending,
                    created_at: timestamp,
                    updated_at: timestamp,
                }
            });

            await Promise.all(
                (data.tickets ?? []).map((input) =>
                    tx.ticket.create({
                        data: {
                            pass_cccd: input.pass_cccd,
                            pass_name: input.pass_name,
                            order_id: order.id,
                            seat_id: input.seat_id,
                            price: 10000,
                            status: TicketStatus.Open,
                            created_at: timestamp,
                            updated_at: timestamp
                        }
                    })
                )
            );

            return order;
        });
    }
    
    //create ordre and the array of the tickets in the same transaction
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
    async staffOrderStatisticPerMonth(id: string, year: number){
        const months = Array.from({ length: 12 }, (_, index) => index + 1);

        return Promise.all(
            months.map(async (month) => {
                const aggregate = await this.prisma.order.aggregate({
                    where: {
                        staff_id: id,
                        created_at: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1)
                        }
                    },
                    _count: {
                        id: true,
                    }
                });

                return {
                    year,
                    month,
                    _count: aggregate._count.id ?? 0
                };
            })
        );
    }
    
      
}
