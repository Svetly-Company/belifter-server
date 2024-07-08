import { z } from "zod";

const LocationSchema = z.object({
    cep: z.string().regex(/^\d{5}-\d{3}$/),
    street: z.string(),
    district: z.string(),
    city: z.string()
});

export const CreateGymSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
    location: LocationSchema
});