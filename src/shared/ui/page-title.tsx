"use client";

import {usePathname} from "next/navigation";
import {config} from "@/shared/lib/config";


export default function PageTitle() {
    const pathname = usePathname();

    const currentNavItem = config.navItems.find((item) => item.href === pathname);

    const title = currentNavItem ? currentNavItem.label : config.title;

    return (
        <div className="w-full flex justify-center my-6">
            <h1 className="text-3xl font-bold">{title}</h1>
        </div>
    )
}