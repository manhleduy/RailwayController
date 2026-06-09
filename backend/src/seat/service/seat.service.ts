import { Injectable } from "@nestjs/common";
import {SeatGetService} from "./get.service";
import {SeatCreateService} from "./create.service";
import {SeatDeleteService} from "./delete.service";
import {SeatUpdateService} from "./update.service";
import { CreateSeatInput } from "../dto";
import { PrismaService } from "../../../prisma/prisma.service";
@Injectable()
export class SeatService{
    private getService: SeatGetService;
    private createService: SeatCreateService;
    private deleteService: SeatDeleteService;
    private updateService: SeatUpdateService;

    constructor(private readonly prisma: PrismaService){
        this.getService = new SeatGetService(prisma);
        this.createService = new SeatCreateService(prisma);
        this.deleteService = new SeatDeleteService(prisma);
        this.updateService = new SeatUpdateService(prisma);
    }
    
    get(id: number){
        return this.getService.get(id);
    }
    getAllByTripId(trip_id: number){
        return this.getService.getAllByTripId(trip_id);
    }
    create(data: CreateSeatInput) {
        this.createService.create(data);
    }

    updateSeat(id: number, status: string){
        return this.updateService.updateSeat(id, status);
    }
    delete(id: number){
        return this.deleteService.deleteSeat(id);
    }

}