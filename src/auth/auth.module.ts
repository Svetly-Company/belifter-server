import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccountModule } from "src/modules/account.module";
import { AccountService } from "src/services/account.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: "abc",
            signOptions: { expiresIn: "2d" }
        }),
        AccountModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        AccountService,
        PrismaService
    ]
})
export class AuthModule {}