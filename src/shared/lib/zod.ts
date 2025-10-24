import { z } from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be more than 6 characters" })
        .max(32, { message: "Password must be less than 32 characters" }),
});

export const ingredientSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
    category: z.enum(["VEGETABLES", "FRUITS", "MEAT", "DAYRY", "SPICES", "OTHER"]),
    unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
    pricePerUnit: z
        .any()
        .refine(
            (val) => typeof val === "number" && val >= 0,
            "Цена должна быть числом и положительной"
        )
        .nullable(),
    description: z.string().optional(),
});
