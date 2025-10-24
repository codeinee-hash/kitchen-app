"use client";

import {useSession} from "next-auth/react";
import {useAuth} from "@/shared/auth/use-auth";
import {ReactNode, useEffect} from "react";
import {useIngredient} from "@/entities/ingredients";
import {useRecipe} from "@/entities/recipes";

export default function AppLoader({ children }: { children: ReactNode }) {
    const {status, data: session} = useSession();
    const {setAuthState, isAuth} = useAuth();
    const {loadIngredients} = useIngredient();
    const {loadRecipes} = useRecipe();

    useEffect(() => {
        setAuthState(status, session);
    }, [session, status, setAuthState]);

    useEffect(() => {
        if (isAuth) {
            loadIngredients();
        }
    }, [isAuth, loadIngredients]);

    useEffect(() => {
        loadRecipes()
    }, [loadRecipes]);

    return <>{children}</>;
}
