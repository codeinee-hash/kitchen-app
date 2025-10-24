"use server";

import {signIn} from "@/shared/auth/auth";


export async function signInWithCredentials(email: string, password: string) {
    try {
        await signIn("credentials", { email, password, redirect: false });
    } catch (error) {
        console.error("Ошибка авторизации: ", error);
        throw error;
    }
}
