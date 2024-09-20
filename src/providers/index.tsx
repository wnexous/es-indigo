'use client'
import { ProviderControllerI } from "@/interfaces/Provider.interface";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import States from "./states";

/**
 * To add yours controllers, includes on ./states.tsx file
 * 
 * read ./readme.md file
 */

type ProviderInterface = typeof States
const provider = createContext<ProviderInterface>({} as any)

export default function Providers({ children }: PropsWithChildren) {
    const [get, set] = useState({})

    Object.keys(States).forEach((p) => {
        const instance = (States as any)[p] as ProviderControllerI<any>
        const getter = get[p as keyof typeof get]
        const setter = (value: any) => set((val: any) => ({ ...val, [p]: { ...val[p], ...value } }))
        instance._injectDispatchs(getter, setter)
    })

    useEffect(() => {
        Object.values(States).map((p: any) => {
            if (p.prototype?.hasLoad) return;
            p.prototype = { hasLoad: true }
            p.init()
        })
    }, [])

    // @ts-ignore
    return <provider.Provider value={{ ...States, _: get }}>
        {children}
    </provider.Provider>
}

export const useProviders = () => useContext(provider) as ProviderInterface

