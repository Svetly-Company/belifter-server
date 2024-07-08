import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hashPassword } from "src/database/helper";
import { AccountService } from "src/services/account.service";

@Injectable()
export class AuthService {
    constructor(private accountService: AccountService, private jwtService: JwtService) {}

    async signIn(email : string, password : string) {
        const account = await this.accountService.findAccountByEmail(email);
        const hashedPassword = hashPassword(password);
        if (!account || hashedPassword !== account.password) {
            return new UnauthorizedException();
        }
        const payload = { id: account.idAccount, email: account.email, name: account.name }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}