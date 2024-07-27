import { z } from "zod";

export const CreatePostSchema = z.object({
    content: z.string(),
    mediaUrl: z.string()
});