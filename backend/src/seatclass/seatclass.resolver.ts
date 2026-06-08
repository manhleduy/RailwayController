import { Query, Resolver } from "@nestjs/graphql";
import { SeatClassModel } from "./model/seatclass.model";
import { SeatClassService } from "./seatclass.service";
@Resolver(()=> SeatClassModel)
export class SeatClassResolver{
    constructor(private readonly seatClassService: SeatClassService){}

    @Query(()=> [SeatClassModel])
    seatClasses(){
        return this.seatClassService.getAll();

    }

    
}