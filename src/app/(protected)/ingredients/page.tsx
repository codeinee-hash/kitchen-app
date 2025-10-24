import IngredientForm from "@/features/ingredients/view/ingredient.form";
import {IngredientsTable} from "@/features/ingredients";

export default function Ingredients() {
    return (
        <div>
            <IngredientForm />
            <IngredientsTable />
        </div>
    )
}