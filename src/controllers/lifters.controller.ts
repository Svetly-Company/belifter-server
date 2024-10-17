/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LifterService } from "src/services/lifters.service";

@Controller('lifters')
export class LifterController {
    constructor(private readonly gymService: LifterService, private readonly authService: AuthService) {}

    @Get()
    async getAllGyms() {
        const gyms = await this.gymService.getUsers();
        return gyms;
    }
}