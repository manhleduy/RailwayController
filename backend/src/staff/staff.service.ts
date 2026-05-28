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
    async create(input: CreateInput){
        const { id, full_name, email, phone, password } = input;
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.prisma.staff.create({
            data: {
                id,
                full_name,
                email,
                phone,
                password: hashedPassword,
                role: 'STAFF',
                created_at: new Date(),
                updated_at: new Date()
            }
        })
    }

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