"use server";

import {ingredientSchema} from "@/shared/lib/zod";
import prisma from "@/shared/lib/prisma";
import {ZodError} from "zod";

export async function createIngredient(formData: FormData) {
    try {
        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            pricePerUnit: formData.get("pricePerUnit") ? parseFloat(formData.get("pricePerUnit") as string) : null,
            unit: formData.get("unit") as string,
        };

        const validateData = ingredientSchema.parse(data);

        const ingredient = await prisma.ingredient.create({
            data: {
                name: validateData.name,
                category: validateData.category,
                unit: validateData.unit,
                pricePerUnit: validateData.pricePerUnit,
                description: validateData.description,
            }
        });

        return {
            success: true,
            ingredient
        };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                error: error.issues.map((e) => e.message).join(", "),
            };
        }

        console.error("Ошибка создание ингредиента: ", error);
        return {
            error: "Ошибка при создание ингредиента",
        }
    }
}

export async function getIngredients() {
    try {
        const ingredients = await prisma.ingredient.findMany();
        return {
            success: true,
            ingredients
        };
    } catch (error) {
        console.error("Ошибка получение ингредиентов: ", error);
        return {
            error: "Ошибка при получении ингредиентов"
        };
    }
}

export async function removeIngredient(id: string) {
    try {
        const ingredient = await prisma.ingredient.delete({
            where: {
                id
            }
        });

        return {
            success: true,
            ingredient
        };
    } catch (error) {
        console.error("Ошибка удаления ингредиента: ", error);
        return {
            error: "Ошибка при удалении ингредиента"
        };
    }
}
