import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { CustomerService } from "../customer/customer.service";
import { CustomerResolver } from "../customer/customer.resolver";
import { PrismaModule } from "../../prisma/prisma.module";
import { PrismaService } from "../../prisma/prisma.service";
import { TicketService } from "../ticket/ticket.service";

@Module({
    
    providers: [
        OrderService, 
        OrderResolver, 
        CustomerService, 
        CustomerResolver, 
        PrismaService,
        PrismaModule,
        TicketService,
        
    ],
})
export class OrderModule{}