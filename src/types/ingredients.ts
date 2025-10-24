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
