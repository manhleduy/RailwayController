
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeatClassService{
    constructor(private readonly prisma: PrismaService){}

    getAll(){
        return this.prisma.seatClass.findMany();
    }
    getById(id: number){
        return this.prisma.seatClass.findUnique({
            where: {
                id
            }
        });
    }
 
}