import { Body, Controller, Get, Post, UnauthorizedException } from "@nestjs/common";
import { GymService } from "src/services/gym.service";
import { ZodPipe } from "src/zod/pipe";
import { CreateGymSchema } from "src/dtos/create-gym-dto";
import { z } from "zod";
import { Public } from "src/auth/public-key";
import { AuthService } from "src/auth/auth.service";

@Controller('gym')
export class GymController {
    constructor(private readonly gymService: GymService, private readonly authService: AuthService) {}

    @Get()
    @Public()
    async getAllGyms() {
        const gyms = await this.gymService.getGyms();
        return gyms;
    }

    @Public()
    @Post('create')
    async createNewGym(@Body(new ZodPipe(CreateGymSchema)) body : z.infer<typeof CreateGymSchema>) {

        const gym = await this.gymService.createGym(body);

        const accessTokenCreation = await this.authService.signIn(body.email, body.password);

        return { gym, access_token: accessTokenCreation['access_token'] || "" };
    }
}