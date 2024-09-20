'use client'

import IndigoTemplate from "@/Templates/IndigoTemplate";
import Icons from "@/assets/Icons";
import If from "@/components/if";
import LoginProviderI from "@/interfaces/LoginProviders.interface";
import { useProviders } from "@/providers";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Signin() {

    const [providers, setProviders] = useState<LoginProviderI>()
    const { session } = useProviders()

    useEffect(() => {
        getProviders().then(setProviders)
    }, [])
    const isLogged = session.isLogged()
    const userSession = session.getSession()

    return <IndigoTemplate>
        <div className="h-full max-w-[520px] w-full flex flex-col justify-center gap-8">

            <If conditional={!isLogged}>
                <div className="flex flex-col gap-2 text-[14px] md:text-sm">
                    <h1 className="text-3xl font-bold font-owners lg:text-5xl">ENTRAR</h1>
                    <p>Escolha uma rede social para continuar seu login</p>
                </div>
                <div className="flex gap-4 flex-wrap">

                    <a
                        className='p-4 rounded-md whitespace-nowrap border flex justify-center flex-grow '
                        href='/'>
                        Retornar à pagina principal
                    </a>
                    {providers && Object.values(providers).map((p, k) =>
                        <button className="gradient w-fit whitespace-nowrap flex items-center justify-center gap-4 flex-grow font-extrabold font-owners text-[#110f1c]  p-2 px-4 rounded-md" onClick={() => signIn(p.id, { callbackUrl: "/" })} key={k}>
                            <Icons.Google width={18} />
                            <span className="pt-1">
                                Entrar com {p.name}
                            </span>
                        </button>)}
                </div>
            </If>

            <If conditional={isLogged}>
                <div className="flex flex-col gap-2 text-[14px] md:text-sm">
                    <h1 className="text-3xl font-bold font-owners lg:text-5xl">Já conectado</h1>
                    <p>Você já está logado em sua conta Google com email <b className="font-bold">{userSession?.email}</b></p>
                </div>
                <div className="flex gap-4 flex-wrap">
                    <a
                        className='p-4 rounded-md whitespace-nowrap border flex justify-center flex-grow'
                        href='/signout'>
                        Desconectar
                    </a>
                    <a href="/" className='p-4 flex-grow rounded-md gradient-2 text-center'>
                        Voltar à página principal
                    </a>
                </div>
            </If>
        </div>
    </IndigoTemplate>
}