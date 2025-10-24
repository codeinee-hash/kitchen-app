import {create} from "zustand"
import {IIngredients} from "@/types/ingredients";
import {createIngredient, getIngredients, removeIngredient} from "@/actions/ingredient";

interface State {
    ingredients: IIngredients[];
    isLoading: boolean;
    error: string | null;
    loadIngredients: () => Promise<void>;
    addingIngredient: (formData: FormData) => Promise<void>;
    removeIngredient: (id: string) => Promise<void>;
}

export const useIngredient = create<State>((set) => ({
    ingredients: [],
    isLoading: false,
    error: null,

    loadIngredients: async () => {
        set({ isLoading: true, error: null });

        try {
            const result = await getIngredients();
            if (result.success) {
                set({ ingredients: result.ingredients, isLoading: false, error: null });
            } else {
                set({ error: result.error, isLoading: false });
            }
        } catch (error) {
            console.error(error);
            set({ error: "Ошибка при загрузке ингредиентов", isLoading: false });
        }
    },

    addingIngredient: async (formData: FormData) => {
        set({ isLoading: true, error: null });

        try {
            const result = await createIngredient(formData);
            if (result.success) {
                set((state) => ({
                    ingredients: [...state.ingredients, result.ingredient],
                    isLoading: false,
                }));
            } else {
                set({ error: result.error, isLoading: false });
            }
        } catch (error) {
            console.error(error);
            set({ error: "Ошибка при добавлении ингредиента", isLoading: false });
        }
    },

    removeIngredient: async (id) => {
        set({ isLoading: true, error: null });

        try {
            const result = await removeIngredient(id);
            if (result.success) {
                set((state) => ({
                    ingredients: state.ingredients.filter((i) => i.id !== id),
                    isLoading: false,
                }))
            } else {
                set({ error: result.error, isLoading: false });
            }
        } catch (error) {
            console.error(error);
            set({ error: "Ошибка при удалении ингредиента", isLoading: false });
        }
    },
}));
