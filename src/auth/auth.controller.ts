import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public-key";
import { AuthDto } from "../dtos/auth-dto"
import z from "zod";

@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signin')
    async signInRoute(@Body() auth: z.infer<typeof AuthDto>) {
        return await this.authService.signIn(auth.email, auth.password);
    }

    @Get("profile")
    async getProfileRoute(@Request() req) {
        return req.user;
    }
}