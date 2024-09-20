'use client'
import { PropsWithChildren, useEffect, useState } from "react";

export default function ClientComponent({ children }: PropsWithChildren) {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient) return children
    else return <></>

}