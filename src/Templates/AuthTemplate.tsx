import Header from "@/layout/header"
import { PropsWithChildren } from "react"

export default function AuthTemplate({ children }: PropsWithChildren) {

    return <>
        <Header />
        <main className="flex-col container-xs font-gotham font-semibold justify-center flex py-8">
            {children}
        </main>
    </>
}
