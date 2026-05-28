import { Resolver } from "@nestjs/graphql";
import { PrismaService } from "../../prisma/prisma.service";
@Resolver()
export class StaffResolver{
    constructor(
        private readonly prisma: PrismaService
    ){}
    
}