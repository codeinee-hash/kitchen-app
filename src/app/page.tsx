"use client";

import {useRecipe} from "@/store/recipe-store";
import Link from "next/link";
import {Button} from "@heroui/react";
import RecipeCard from "@/components/layout/recipe-card";
import {useAuth} from "@/store/auth-store";

export default function Home() {
    const {recipes, isLoading, error} = useRecipe();
    const isAuth = useAuth((s) => s.isAuth);

  return (
      <>
          {isAuth && (
              <div className="w-full flex justify-center items-center mb-4">
                  <Link href="/recipes/new">
                      <Button color={"primary"}>Добавить рецепт</Button>
                  </Link>
              </div>
          )}

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {isLoading && <p>Загрузка...</p>}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
      </>
  );
}
