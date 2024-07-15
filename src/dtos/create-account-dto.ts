import { z } from "zod";

export const CreateAccountDTO = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(3)
})