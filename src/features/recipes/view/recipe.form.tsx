"use client";

import {useState, useTransition} from "react";
import {Button, Form, Input, Select, SelectItem} from "@heroui/react";
import {useIngredient} from "@/entities/ingredients";
import {useRecipe} from "@/entities/recipes";
import {IRecipe} from "@/shared/lib/types";
import {useRouter} from "next/navigation";


interface IIngredientField {
    id: number;
    ingredientId: string;
    quantity: number | null;
}

const initialState = {
    name: "",
    description: "",
    imageUrl: ""
}

export default function RecipeForm({initialRecipe}: {initialRecipe?: IRecipe}) {
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: initialRecipe?.name || initialState.name,
        description: initialRecipe?.description || initialState.description,
        imageUrl: initialRecipe?.imageUrl || initialState.imageUrl,
    });
    const [ingredientFields, setIngredientFields] = useState<IIngredientField[]>(
        initialRecipe?.ingredients
            ? initialRecipe.ingredients.map((ing, idx) => ({
                id: idx,
                ingredientId: ing.ingredientId,
                quantity: ing.quantity
            }))
            : [{ id: 0, ingredientId: "", quantity: null }]
    );

    const {ingredients} = useIngredient();
    const {addRecipe, updateRecipe} = useRecipe();
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handleAddIngredientField = () => {
        if (ingredientFields.length < 10) {
            setIngredientFields([...ingredientFields, { id: ingredientFields.length, ingredientId: "", quantity: null }]);
        }
    }

    const handleRemoveIngredientField = (id: number) => {
        if (ingredientFields.length > 1) {
            setIngredientFields(ingredientFields.filter((f) => f.id !== id));
        }
    }

    const handleIngredientChange = (id: number, field: keyof IIngredientField, value: string | number | null) => {
        setIngredientFields(ingredientFields.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
    }

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            setError(null);
            const result = initialRecipe ? await updateRecipe(initialRecipe.id, formData) : await addRecipe(formData);

            if (result.success) {
                setIngredientFields([{ id: 0, ingredientId: "", quantity: null }]);
                router.push("/");
                setFormData(initialState);
            } else {
                setError(result.error || "Ошибка при сохранении рецепта");
            }
        });
    }

    return (
        <Form action={handleSubmit} className="w-[500px]">
            {error && <p className="mb-4 text-red-500">{error}</p>}

            <Input
                isRequired
                name="name"
                placeholder="Введите название ингредиента"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                validate={(value) => (!value ? "Название обязательно": null)}
                classNames={{ inputWrapper: "bg-default-100",  input: "text-sm focus:outline-none" }}
            />
            <Input
                isRequired
                name="description"
                placeholder="Введите описание"
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                classNames={{ inputWrapper: "bg-default-100",  input: "text-sm focus:outline-none" }}
            />
            <Input
                name="imageUrl"
                placeholder="URL картинки"
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                classNames={{ inputWrapper: "bg-default-100",  input: "text-sm focus:outline-none" }}
            />

            <div className="space-y-2 w-full">
                {ingredientFields.map((field, idx) => (
                    <div key={field.id} className="flex items-center gap-2">
                        <Select
                            isRequired
                            name={`ingredient_${idx}`}
                            placeholder="Выберите ингредиент"
                            selectedKeys={field.ingredientId ? [field.ingredientId] : []}
                            onChange={(e) => handleIngredientChange(field.id, "ingredientId", e.target.value)}
                            classNames={{
                                trigger: "w-full bg-default-100",
                                innerWrapper: "text-sm",
                                value: "truncate",
                                selectorIcon: "text-black"
                            }}
                        >
                            {ingredients.map((ing) => (
                                <SelectItem key={ing.id} className="text-black">{ing.name}</SelectItem>
                            ))}
                        </Select>
                        <Input
                            isRequired
                            name={`quantity_${idx}`}
                            placeholder="Кол-во"
                            type="number"
                            value={field.quantity !== null ? field.quantity.toString() : ""}
                            onChange={(e) =>
                                handleIngredientChange(field.id, "quantity", e.target.value ? parseFloat(e.target.value) : null)
                            }
                            validate={(value) => !value || parseFloat(value) <= 0 ? "Кол-во должно быть больше 0" : null}
                            className="w-[100px]"
                            classNames={{ inputWrapper: "bg-default-100", input: "text-sm focus:outline-none" }}
                        />
                        {ingredientFields.length > 1 && (
                            <Button color={"danger"} variant={"light"} className="w-[50px]" onPress={() => handleRemoveIngredientField(field.id)}>
                                -
                            </Button>
                        )}
                    </div>
                ))}

                {ingredientFields.length < 10 && (
                    <Button color={"primary"} variant={"flat"} onPress={handleAddIngredientField}>+</Button>
                )}
            </div>

            <div className="w-full flex items-center justify-center mt-4">
                <Button color={"primary"} type={"submit"} isLoading={isPending}>
                    {initialRecipe ? "Сохранить изменения" : "Добавить рецепт"}
                </Button>
            </div>
        </Form>
    );
}