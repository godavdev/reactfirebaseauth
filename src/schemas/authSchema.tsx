import { z } from "zod";

export const authSchema = z.object({
    email: z.string()
        .email({
            message: "This is not a valid email"
        }),
    password: z.string()
        .min(6, {
            message: "The password must have more than 6 characters"
        })
        .refine((val) => /\d/.test(val), {
            message: "The password must have at least 1 digit"
        }),
    persistence: z.boolean()
})