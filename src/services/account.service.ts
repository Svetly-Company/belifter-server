/* eslint-disable prettier/prettier */
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

    async createNewAccount(email : string, password : string, name : string, picture : string) {
        const HashPass = hashPassword(password);
        try{
            const u = await this.prisma.account.create({
                data: {
                    email,
                    password: HashPass,
                    name,
                    profilePicture: picture || ""
                }
            })
            return { id: u.idAccount, name: u.name, email: u.email, profilePicture: u.profilePicture };
        }catch(e) {
            throw new BadRequestException(e.meta);
        }
    }

    async getUser(id : string) {
        const user = await this.prisma.account.findFirst({ where: { idAccount: Number(id) } });
        return user;
    }
}  