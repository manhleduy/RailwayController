import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTicketInput } from "./dto/create.dto";
import { UpdateTicketInput } from "./dto/update.dto";

@Injectable()
export class TicketService{
    constructor( private readonly prisma: PrismaService){}

    async create(createTicketInput: CreateTicketInput[]){
        return await this.prisma.$transaction(
            createTicketInput.map((input:any) => 
                this.prisma.ticket.create({
                    data: {
                        pass_cccd: input.pass_cccd,
                        pass_name: input.pass_name,
                        order_id: input.order_id,
                        seat_id: input.seat_id,
                        price: 10000,
                        status: "Open",
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                })
            )
        );
    
    }
    async findAllByOrderId(orderId: number){
        const tickets = await this.prisma.ticket.findMany({
            where: {
                order_id: orderId
            }
        });
        return tickets;
    }
    async findById(id: number){
        const ticket = await this.prisma.ticket.findFirst({
            where: {
                id: id
            }
        });
        return ticket;
    }
    async deleteOne(id: number){
        const ticket = await this.prisma.ticket.delete({
            where: {
                id: id
            }
        })
    }
    async updateOne(data: UpdateTicketInput){
        const ticket = await this.prisma.ticket.update({
            where: {
                id: data.id
            },
            data: {
                pass_cccd: data.pass_cccd,
                pass_name: data.pass_name,
                order_id: data.order_id,
                seat_id: data.seat_id,
                updated_at: new Date()
            }
        });
    }

}
