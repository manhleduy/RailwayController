import { Injectable } from "@nestjs/common";
import { LoginInput } from "./dto/login.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateInput } from "./dto/create.dto";
import bcrypt from 'bcrypt';
@Injectable()
export class StaffService{
    constructor(
        private readonly prisma: PrismaService
    ){}
    
    async login(input: LoginInput){
            return await this.prisma.customer.findFirst({
                where:{
                    AND: [
                        {id: input.id},
                        {email: input.email}
                    ]
                },
                select:{
                    id: true,
                    full_name: true,
                    email: true,
                    phone: true,
                    password: true
                }
            })
        }
    
    
}