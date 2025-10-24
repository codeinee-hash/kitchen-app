export interface IRecipeIngredient {
    id: string;
    ingredientId: string;
    quantity: number;
    ingredient: IIngredients
}

export interface IRecipe {
    id: string;
    name: string;
    description: string;
    imageUrl?: string | null;
    ingredients: IRecipeIngredient[];
}

export interface IIngredients {
    id: string;
    name: string;
    description: string | null;
    category: string;
    unit: string;
    pricePerUnit: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFormData {
    email: string,
    password: string,
    confirmPassword: string,
}
