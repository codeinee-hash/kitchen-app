"use client";

import {usePathname} from "next/navigation";
import {config} from "@/shared/lib/config";
import DOMPurify from "isomorphic-dompurify"; // for Next.js
import parse from "html-react-parser";

export default function PageContent() {
    const pathname = usePathname();

    const pageContent = config.pagesContent[pathname as keyof typeof config.pagesContent];

    if (!pageContent) {
        return <div>Страница не найдена</div>;
    }

    const clientHTML = DOMPurify.sanitize(pageContent.content);

    return <div>{parse(clientHTML)}</div>;
}
