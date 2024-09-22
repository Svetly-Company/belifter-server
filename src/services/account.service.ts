import { BadRequestException, Injectable } from "@nestjs/common";
import { hashPassword } from "src/database/helper";
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
    async findAccountById(id : number) {
        const u = await this.prisma.account.findUnique({
            where: { idAccount: id }
        })
        return u || null;
    }

    async createNewAccount(email : string, password : string, name : string) {
        const HashPass = hashPassword(password);
        try{
            const u = await this.prisma.account.create({
                data: {
                    email,
                    password: HashPass,
                    name,
                    profilePicture: ""
                }
            })
            return { id: u.idAccount, name: u.name, email: u.email, profilePicture: u.profilePicture };
        }catch(e) {
            throw new BadRequestException(e.meta);
        }
    }
}  