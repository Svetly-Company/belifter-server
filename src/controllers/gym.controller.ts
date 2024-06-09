import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateGymBody, LocationValidator } from "src/dtos/create-gym-dto";
import { GymService } from "src/services/gym.service";
import { BadRequestException } from "@nestjs/common/exceptions";

@Controller('gym')
export class GymController {
    constructor(private readonly gymService: GymService) {}

    @Get()
    getAllGyms() {
        return this.gymService.getGyms();
    }

    @Post()
    async createNewGym(@Body() body : CreateGymBody) {
        
        const { cnpj, name, location, password } = body;

        const { success, data: validatedLocation, error } = LocationValidator.safeParse(location);

        if(!success) throw new BadRequestException(error);

        const gym = await this.gymService.createGym({ cnpj, name, password, location: validatedLocation });

        return { gym };
    }
}