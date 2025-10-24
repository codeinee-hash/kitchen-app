"use client";

import {useSearchParams} from "next/navigation";

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message") || "Неизвестная ошибка";

    return (
        <div className="flex justify-center items-center">
            <p className="text-xl text-red-500">{message}</p>
        </div>
    );
}
