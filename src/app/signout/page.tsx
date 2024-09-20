'use client'

import IndigoTemplate from "@/Templates/IndigoTemplate";
import { signOut } from "next-auth/react";
export default function Signout() {

    const onSignout = () => {
        signOut({ callbackUrl: "/", redirect: true })
    }

    return <IndigoTemplate>


        <div className="h-full max-w-[520px] flex flex-col justify-center gap-8 w-full">
            <div className="flex flex-col gap-2 text-[14px] md:text-sm">
                <h1 className="text-3xl font-bold font-owners lg:text-5xl">DESCONECTAR</h1>
                <p>Deseja desconectar sua conta google?</p>
            </div>
            <div className="flex gap-4 flex-shrink flex-wrap">
                <a
                    className='p-4 rounded-md border flex justify-center flex-grow '
                    href='/'>
                    Retornar à pagina principal
                </a>
                <button onClick={onSignout} className='p-4 flex-grow rounded-md gradient-2'>
                    Desconectar
                </button>
            </div>
        </div>
    </IndigoTemplate>
}