import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTicketInput } from "./dto/create.dto";
import { UpdateTicketInput } from "./dto/update.dto";

@Injectable()
export class TicketService{
    constructor( private readonly prisma: PrismaService){}
    async findAll(){
        return await this.prisma.ticket.findMany();
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
    async findBySeatId(seatId: number){
        const ticket = await this.prisma.ticket.findFirst({
            where: {
                seat_id: seatId
            }
        })
        return ticket;
    }
    async deleteOne(id: number){
        const ticket = await this.prisma.ticket.delete({
            where: {
                id: id
            }
        })
        return ticket;
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
        return ticket;
    }
    async create(data: CreateTicketInput){
        return await this.prisma.ticket.create({
            data:{
                ...data,
                status: "Open",
                created_at: new Date(),
                updated_at: new Date()
            }
        })
    }
    
    async statisticWithOrderId(orderId: number){
        const temp: any= await this.prisma.$queryRaw`
        SELECT COUNT(t.order_id) as _count, SUM(sc.price) as _sum
        FROM "Ticket" t
        INNER JOIN "Seat" s ON t.seat_id = s.id
        INNER JOIN "SeatClass" sc On s.seat_class_id = sc.id
        WHERE t.order_id = ${orderId}
        GROUP BY t.order_id`
        return {
            _count: parseInt(temp[0]?._count ?? 0),
            _sum: temp[0]?._sum ?? 0
        }
    }
    
    

}
