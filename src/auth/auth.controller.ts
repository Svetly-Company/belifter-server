import { BadRequestException, Body, Controller, Get, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public-key";
import { AuthDto } from "../dtos/auth-dto"
import z from "zod";
import { AccountService } from "src/services/account.service";
import { UploadService } from "src/services/upload.service";

@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService, private user : AccountService, private uploadService: UploadService) {}

    @Public()
    @Post('signin')
    async signInRoute(@Body() body: z.infer<typeof AuthDto>) {
        const { success, data, error } = AuthDto.safeParse(body);
        if(!success) throw new BadRequestException(error);
        return await this.authService.signIn(data.email, data.password);
    }

    @Get("profile")
    async getProfileRoute(@Request() req) {
        const account = await this.user.findAccountById(req.user.id)
        const mediaUrl = await this.uploadService.getImageUrl(account.profilePicture)
        return { id: account.idAccount, email: account.email, name: account.name, profilePicture: mediaUrl};
    }
}