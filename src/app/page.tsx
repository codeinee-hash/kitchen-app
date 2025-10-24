"use client";

import Link from "next/link";
import {Button} from "@heroui/react";
import {RecipeList} from "@/features/recipes";
import {useAuth} from "@/shared/auth/use-auth";

export default function Home() {
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

          <RecipeList />
      </>
  );
}
