import RecipeCard from "@/features/recipes/view/recipe-card";
import {useRecipe} from "@/entities/recipes";

export function RecipeList() {
    const {recipes, isLoading, error} = useRecipe();

    return (
        <>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {isLoading && <p>Загрузка...</p>}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
            </div>
        </>
    )
}
