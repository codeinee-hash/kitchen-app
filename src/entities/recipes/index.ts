import {createRecipe, getRecipes, updateRecipe, removeRecipe} from "./repositories/recipe-repository";

export {useRecipe} from "./model/use-recipe";

export const recipesRepository = {
    createRecipe,
    getRecipes,
    updateRecipe,
    removeRecipe,
}
