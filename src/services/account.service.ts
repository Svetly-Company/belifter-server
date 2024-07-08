import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable() 
export class AccountService {
    constructor(private prisma: PrismaService) {}

    async findAccountByEmail(email : string) {
        const u = await this.prisma.account.findUnique({
            where: { email }
        })
        return u || null;
    }
}  