import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/auth/public-key";
import { CreateAccountDTO } from "src/dtos/create-account-dto";
import { AccountService } from "src/services/account.service";
import { z } from "zod";

@Controller("account")
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Public()
    @Post("create")
    async createAccountRoute(@Body() body: z.infer<typeof CreateAccountDTO>) {
        const {success, data, error} = CreateAccountDTO.safeParse(body);
        if(!success) throw new BadRequestException(error);
        return await this.accountService.createNewAccount(data.email, data.password, data.name);
    }
}