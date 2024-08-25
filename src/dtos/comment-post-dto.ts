import { z } from "zod";

export const CommentPostSchema = z.object({
    content: z.string()
})

export const LikePostSchema = z.object({
    changeTo: z.boolean()
})