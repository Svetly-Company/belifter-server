import { IsNotEmpty, Matches } from "class-validator";
import { z } from "zod";
import { createZodDto } from "nestjs-zod";


export const LocationValidator = z.object({
    cep: z.string().regex(/^\d{5}-\d{3}$/),
    street: z.string(),
    district: z.string(),
    city: z.string()
});

class LocationBody extends createZodDto(LocationValidator) {}

export class CreateGymBody {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    cnpj: string;

    location: LocationBody;

}