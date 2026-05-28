import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { PrismaModule } from "../../prisma/prisma.module";
@Module({
    providers: [AuthService, AuthResolver],
    

})
export class AuthModule{}