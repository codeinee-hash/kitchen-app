"use client";

import {useParams} from "next/navigation";
import {useRecipe} from "@/entities/recipes";
import {useEffect, useState} from "react";
import {IRecipe} from "@/shared/lib/types";
import RecipeForm from "@/features/recipes/view/recipe.form";


export default function EditRecipePage() {
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const {id} = useParams<{id: string}>();
    const {recipes, isLoading, error} = useRecipe();

    useEffect(() => {
        if (recipes.length > 0 || error) {
            const foundRecipe = recipes.find((recipe) => recipe.id === id);
            setRecipe(foundRecipe || null);
            setHasSearched(true);
        }
    }, [recipes, id, error]);

    if (isLoading) return <p className="text-center">Загрузка...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (hasSearched && !recipe) return <p className="text-center text-red-500">Рецепт не найден</p>;

    if (recipe) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Редактировать рецепт: {recipe.name}</h1>

                <RecipeForm initialRecipe={recipe} />
            </div>
        );
    }

    return <p className="text-center">Загрузка...</p>
}