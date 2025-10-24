"use server";

import prisma from "@/shared/lib/prisma";


export async function getUserFromDb(email: string) {
    const user =  await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        return null;
    }

    return user;
}
