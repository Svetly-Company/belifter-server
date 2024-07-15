import { BadRequestException, Body, Controller, Get, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public-key";
import { AuthDto } from "../dtos/auth-dto"
import z from "zod";

@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signin')
    async signInRoute(@Body() body: z.infer<typeof AuthDto>) {
        const { success, data, error } = AuthDto.safeParse(body);
        if(!success) throw new BadRequestException(error);
        return await this.authService.signIn(data.email, data.password);
    }

    @Get("profile")
    async getProfileRoute(@Request() req) {
        return req.user;
    }
}