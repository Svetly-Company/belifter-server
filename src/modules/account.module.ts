import { Module } from "@nestjs/common";
import { AccountController } from "src/controllers/account.controller";
import { PrismaService } from "src/database/prisma.service";
import { AccountService } from "src/services/account.service";

@Module({
    providers: [
        PrismaService,
        AccountService
    ],
    controllers: [
        AccountController
    ]
})
export class AccountModule {}