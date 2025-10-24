"use client";

import {usePathname} from "next/navigation";
import {siteConfig} from "@/config/site.config";


export default function PageTitle() {
    const pathname = usePathname();

    const currentNavItem = siteConfig.navItems.find((item) => item.href === pathname);

    const title = currentNavItem ? currentNavItem.label : siteConfig.title;

    return (
        <div className="w-full flex justify-center my-6">
            <h1 className="text-3xl font-bold">{title}</h1>
        </div>
    )
}