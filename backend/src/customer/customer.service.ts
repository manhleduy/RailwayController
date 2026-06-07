import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { CreateInput } from "./dto/create.dto";
import { LoginInput } from "./dto/login.dto";
import { UpdateCustomerInput } from "./dto/update.dto";
@Injectable()
export class CustomerService{
    constructor( private readonly prisma: PrismaService){}
    async create(input: CreateInput){
    const { id, full_name, email, phone, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
      return await this.prisma.customer.create({
        data: {
          id,
          full_name,
          email,
          phone,
          password: hashedPassword,
          rank: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
      });        
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

    async delete(id: string){
        return await this.prisma.customer.delete({
            where: {
                id
            }
        })
    } 
    upRank(id: string){
        return this.prisma.customer.update({
            where: {
                id
            },
            data: {
                rank: {
                    increment: 1
                }
            }
        })
    }  
    updateInfor(data: UpdateCustomerInput){
        const { id, full_name, email, phone } = data;
        return this.prisma.customer.update({
            where: {
                id
            },
            data: {
                full_name,
                email,
                phone
            }
        })
    }
    resetPassword(id: string, password: string){
        return this.prisma.customer.update({
            where: {
                id
            },
            data: {
                password
            }
        })
    
    }
    getbyId(id: string){
        return this.prisma.customer.findFirst({
            where: {
                id
            }
        })
    
    }

}