import { z } from "zod";

const LocationSchema = z.object({
    cep: z.string().length(8),
    street: z.string(),
    district: z.string(),
    city: z.string()
});

export const CreateGymSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cnpj: z.string().length(14),
    location: LocationSchema,
    times: z.any()
});