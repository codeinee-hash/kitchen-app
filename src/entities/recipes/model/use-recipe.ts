import {create} from "zustand";
import {IRecipe} from "@/shared/lib/types";
import {recipesRepository} from "@/entities/recipes";

interface IActionResult {
    success: boolean;
    recipe?: IRecipe;
    error?: string;
}

interface State {
    recipes: IRecipe[];
    isLoading: boolean;
    error: string | null;
    loadRecipes: () => Promise<void>;
    addRecipe: (formData: FormData) => Promise<IActionResult>;
    updateRecipe: (id: string, formData: FormData) => Promise<IActionResult>;
    removeRecipe: (id: string) => Promise<void>;
}

export const useRecipe = create<State>((set) => ({
    recipes: [],
    isLoading: false,
    error: null,

    loadRecipes: async () => {
        set({ isLoading: true, error: null });

        try {
            const result = await recipesRepository.getRecipes();

            if (result.success) {
                set({ recipes: result.recipes, isLoading: false });
            } else {
                set({ error: result.error, isLoading: false });
            }
        } catch (error) {
            console.error(error);
            set({ error: "Ошибка при загрузке рецептов", isLoading: false });
        }
    },

    addRecipe: async (formData) => {
        set({ error: null });

        try {
            const result = await recipesRepository.createRecipe(formData);

            if (result.success) {
                set((state) => ({ isLoading: false, recipes: [...state.recipes, result.recipe!] }));
                return { success: true, recipe: result.recipe };
            } else {
                set({ error: result.error, isLoading: false });
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error(error);
            set({ error: "Ошибка при добавлении рецепта", isLoading: false })
            return { success: false, error: "Ошибка при добавлении рецепта" };
        }
    },

    updateRecipe: async (id, formData) => {
        set({ error: null });

        try {
            const result = await recipesRepository.updateRecipe(id, formData);

            if (result.success) {
                set((state) => ({
                    isLoading: false,
                    recipes: state.recipes.map((r) => r.id === id ? result.recipe! : r)
                }));
                return { success: true, recipe: result.recipe };
            } else {
                set({ isLoading: false, error: result.error });
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error(error);
            set({ isLoading: false, error: "Ошибка при обновлении рецепта" });
            return { success: false, error: "Ошибка при обновлении рецепта" };
        }

    },

    removeRecipe: async (id) => {
        set({ error: null });

        try {
            const result = await recipesRepository.removeRecipe(id);

            if (result.success) {
                set((state) => ({
                    isLoading: false,
                    recipes: state.recipes.filter((r) => r.id !== id),
                }));
            } else {
                set({ error: result.error, isLoading: false });
            }
        } catch (error) {
            console.error(error);
            set({ error: "Ошибка при удалении рецепта", isLoading: false });
        }
    }
}));


