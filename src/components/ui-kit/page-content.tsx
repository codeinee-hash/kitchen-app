"use client";

import {usePathname} from "next/navigation";
import {siteConfig} from "@/config/site.config";
import DOMPurify from "isomorphic-dompurify"; // for Next.js
import parse from "html-react-parser";

export default function PageContent() {
    const pathname = usePathname();

    const pageContent = siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent];

    if (!pageContent) {
        return <div>Страница не найдена</div>;
    }

    const clientHTML = DOMPurify.sanitize(pageContent.content);

    return <div>{parse(clientHTML)}</div>;
}
