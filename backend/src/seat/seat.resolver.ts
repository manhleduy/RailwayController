import { Query, Resolver, Args } from "@nestjs/graphql";
import { SeatService } from "./seat.service";
import { SeatModel } from "./model/seat.model";


@Resolver()
export class SeatResolver{
    constructor(private readonly seatService: SeatService){}

    @Query(()=> SeatModel)
    seat(@Args('id') id: number){
        return this.seatService.get(id);
    }


}