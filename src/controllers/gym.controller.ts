import { Body, Controller, Get, Post } from "@nestjs/common";
import { GymService } from "src/services/gym.service";
import { ZodPipe } from "src/zod/pipe";
import { CreateGymSchema } from "src/dtos/create-gym-dto";
import { z } from "zod";

@Controller('gym')
export class GymController {
    constructor(private readonly gymService: GymService) {}

    @Get()
    getAllGyms() {
        return this.gymService.getGyms();
    }

    @Post()
    async createNewGym(@Body(new ZodPipe(CreateGymSchema)) body : z.infer<typeof CreateGymSchema>) {
        
        const { cnpj, name, location, password } = body;

        const gym = await this.gymService.createGym({ cnpj, name, password, location });

        return { gym };
    }
}