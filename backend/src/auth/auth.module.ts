import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { PrismaModule } from "../../prisma/prisma.module";
import { CustomerService } from "../customer/customer.service";
import { StaffService } from "../staff/staff.service";
import { StaffModule } from "../staff/staff.module";
import { CustomerModule } from "../customer/customer.module";
import { PrismaService } from "../../prisma/prisma.service";
@Module({
    providers: [
        AuthService,
        AuthResolver,
        CustomerService, 
        
        StaffService, 
        PrismaService],
    

})
export class AuthModule{}