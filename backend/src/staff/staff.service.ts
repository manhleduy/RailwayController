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
    async create(input: CreateInput){
        const hashedPassword = await bcrypt.hash(input.password, 10);
        return await this.prisma.staff.create({
            data: {
                ...input,
                password: hashedPassword,
                created_at: new Date(),
                updated_at: new Date(),
                role: "STAFF"
            }
        });
    }
    
    
}