import {getIngredients, createIngredient, removeIngredient} from "./repositories/ingredient-repository";

export {useIngredient} from './model/use-ingredient';

export const ingredientsRepository = {
    getIngredients,
    createIngredient,
    removeIngredient,
};
