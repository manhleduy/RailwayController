import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CustomerModel } from "../../generated/prisma/models";

@Injectable()
export class CustomerService{
    constructor( private readonly prisma: PrismaService){}
    async deleteCustomer(id: string){
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
    updateInfor(id: string, full_name: string, email: string, phone: string){
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