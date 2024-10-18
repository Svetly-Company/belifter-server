/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Public } from "src/auth/public-key";
import { CreateAccountDTO } from "src/dtos/create-account-dto";
import { AccountService } from "src/services/account.service";
import { UploadService } from "src/services/upload.service";
import { z } from "zod";

@Controller("account")
export class AccountController {
    constructor(private accountService: AccountService, private readonly uploadService: UploadService) {}

    @Public()
    @Post("create")
    async createAccountRoute(@Body() body: z.infer<typeof CreateAccountDTO>) {
        const {success, data, error} = CreateAccountDTO.safeParse(body);
        if(!success) throw new BadRequestException(error);
        return await this.accountService.createNewAccount(data.email, data.password, data.name);
    }

    @Get(":id")
    async getAluno(@Param("id") id : string) {
        const aluno = await this.accountService.getUser(id);
        const image = await this.uploadService.getImageUrl(aluno.profilePicture);
        return {...aluno, profilePicture: image};
    }
}