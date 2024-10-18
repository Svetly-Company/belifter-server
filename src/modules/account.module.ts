import { Module } from "@nestjs/common";
import { AccountController } from "src/controllers/account.controller";
import { PrismaService } from "src/database/prisma.service";
import { AccountService } from "src/services/account.service";
import { UploadService } from "src/services/upload.service";

@Module({
    providers: [
        PrismaService,
        AccountService,
        UploadService
    ],
    controllers: [
        AccountController
    ]
})
export class AccountModule {}