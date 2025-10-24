import IngredientForm from "@/components/forms/ingredient.form";
import IngredientsTable from "@/components/tables/ingredients";

export default function Ingredients() {
    return (
        <div>
            <IngredientForm />
            <IngredientsTable />
        </div>
    )
}