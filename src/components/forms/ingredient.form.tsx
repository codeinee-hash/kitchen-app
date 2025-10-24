"use client";

import {useState} from "react";
import {Button, Form, Input, Select, SelectItem} from "@heroui/react";
import {CATEGORY_OPTIONS, UNIT_OPTIONS} from "@/constants/select-options";
import {useTransition} from "react";
import {useIngredient} from "@/store/ingredient-store";

const initialState = {
    name: "",
    category: "",
    unit: "",
    pricePerUnit: null as number | null,
    description: "",
}

export default function IngredientForm() {
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialState);
    const {addingIngredient} = useIngredient();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            await addingIngredient(formData);
            const error = useIngredient.getState().error;

            if (error) {
                setError(error);
            } else {
                setError(null);
                setFormData(initialState);
            }
        });
    }

    return (
        <Form action={handleSubmit} className="w-full">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <Input
                isRequired
                name="name"
                placeholder="Введите название ингредиента"
                type="text"
                value={formData.name}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                validate={(value) => {
                    if (!value) return "Название обязательно";
                    return null;
                }}
            />

            <div className="w-full flex gap-2">
                <div className="w-1/3">
                    <Select
                        isRequired
                        name="category"
                        placeholder="Категории"
                        selectedKeys={formData.category ? [formData.category] : []}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        classNames={{
                            trigger: "w-full bg-default-100",
                            innerWrapper: "text-sm",
                            selectorIcon: "text-black",
                            value: "truncate",
                        }}
                    >
                        {CATEGORY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} className="text-black">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-1/3">
                    <Select
                        isRequired
                        name="unit"
                        placeholder="Ед. изм."
                        selectedKeys={formData.unit ? [formData.unit] : []}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        classNames={{
                            trigger: "w-full bg-default-100",
                            innerWrapper: "text-sm",
                            selectorIcon: "text-black",
                            value: "truncate",
                        }}
                    >
                        {UNIT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} className="text-black">
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-1/3">
                    <Input
                        isRequired
                        name="pricePerUnit"
                        placeholder="Цена"
                        type="number"
                        value={formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ""}
                        classNames={{
                            inputWrapper: "bg-default-100",
                            input: "text-sm focus:outline-none"
                        }}
                        onChange={(e) => {
                            const value = e.target.value ? parseFloat(e.target.value) : null;
                            setFormData({...formData, pricePerUnit: value});
                        }}
                        endContent={
                            <span className="absolute right-3 top-1/2 transform -translate-y-1.5">₽ P</span>
                        }
                        validate={(value) => {
                            if (!value) {
                                return "Цена обязательна";
                            }
                            const num = parseFloat(value);
                            if (isNaN(num) || num < 0) {
                                return "Цена должна быть положительной";
                            }
                            return null;
                        }}
                    />
                </div>
            </div>

            <Input
                isRequired
                name="description"
                placeholder="Введите описание ингредиента"
                type="text"
                value={formData.description}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
            />

            <div className="w-full flex items-center justify-end">
                <Button type={"submit"} color={"primary"} isLoading={isPending}>Добавить ингредиент</Button>
            </div>
        </Form>
    );
}
