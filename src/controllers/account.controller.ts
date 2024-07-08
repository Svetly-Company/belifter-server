import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/auth/public-key";
import { AccountService } from "src/services/account.service";

@Controller("account")
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Public()
    @Post("create")
    async createAccountRoute(@Body() body: { email: string, password: string, name: string }) {
        return await this.accountService.createNewAccount(body.email, body.password, body.name);
    }
}