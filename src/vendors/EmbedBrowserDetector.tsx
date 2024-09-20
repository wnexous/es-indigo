"use client"
import EmbedPage from "@/app/embedPage";
import LoadingPage from "@/app/loading";
import { PropsWithChildren, useEffect, useState } from "react";

export default function EmbedBrowserDetector({ children }: PropsWithChildren) {

    const [isEmbed, setIsEmbed] = useState<boolean>()
    useEffect(() => {
        // @ts-ignore
        const userAgent: string = navigator?.userAgent || navigator?.vendor || window?.opera

        setIsEmbed(/Instagram/i.test(userAgent) ||
            /Instagram/.test(userAgent) ||
            /FBAN/.test(userAgent) ||
            /FBAV/.test(userAgent) ||
            /FB_IAB|FBAN|FBAV/i.test(userAgent) ||
            /TikTok/i.test(userAgent)
        )
    }, [])

    if (isEmbed == undefined) return <LoadingPage />
    if (isEmbed == true) return <EmbedPage />
    return <>
        {children}
    </>

    // Exemplo de detecção de navegadores embutidos em aplicativos comuns

}