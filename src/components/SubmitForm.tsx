'use client'

import Icons from "@/assets/Icons"
import LoginProviderI from "@/interfaces/LoginProviders.interface"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import InputFile, { FileI } from "./InputFile"
import Loading from "./Loading"
import Text from "./Text"

interface SubmitFormI {
    isLogged: boolean
    isLoading: boolean
    enableSubmitButton: boolean
    providers?: LoginProviderI
    onInputFile: (file: FileI | undefined) => void
    inputfileErrorMessage: string | undefined
}

export default (props: SubmitFormI) => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [isClient])

    if (!isClient) return <div className="flex gap-4 items-center w-full justify-center">
        Carregando...
        <span className="w-4 h-4 border-t rounded-full animate-spin"></span>
    </div>

    if (!props.isLogged)
        return <div className="text-[12px] sm:text-sm">
            <h3 className="font-bold font-owners text-[14px]">ENTRAR</h3>
            <Text className="flex flex-col gap-4 ">
                Para continuar a inscrição, é necessário entrar com sua conta Google
            </Text>
            <div className="mt-4 flex flex-col gap-4">
                {props.providers && Object.values(props.providers).map((p, k) =>
                    <button className="gradient w-fit flex items-center gap-4 font-owners text-[#110f1c]  p-2 px-4 rounded-md" onClick={() => signIn(p.id, { callbackUrl: "/" })} key={k}>
                        <Icons.Google width={18} />
                        <span className="pt-1">
                            Entrar com {p.name}
                        </span>
                    </button>
                )}
            </div>
        </div>

    else return <div className=" w-full flex flex-col gap-2" >
        <div className="text-[12px] sm:text-sm">
            <h3 className="font-bold font-owners text-[14px]">PAGAMENTO</h3>
            <span className="flex flex-col gap-4 text-[12px]">
                <Text>
                    Por favor faça seu pagamento via pix e anexe o comprovante em anexo.<br />
                    Pix: 41998296746
                </Text>
                <Text>Cada aula avulsa tem custo de R$10,00 e o combo com todas as aulas é R$75,00.</Text>
            </span>
        </div>
        <div className="flex flex-col gap-2">
            <InputFile onChange={props.onInputFile} />
            {props.inputfileErrorMessage && <span className="text-red-500 text-[12px]">{props.inputfileErrorMessage}</span>}

            <p className="text-[9px]">Em caso de dúvidas, entre em contato conosco pelo instagram ou pelo WhatsApp 41 99764-3046.</p>
        </div>
        <button type="submit" disabled={!props.enableSubmitButton} className=" w-full gradient-2 transition-all duration-500 h-12 rounded font-bold font-owners text-[#110f1c] flex items-center justify-center py-2 disabled:saturate-0 disabled:cursor-not-allowed disabled:brightness-50 disabled:text-white">
            {props.isLoading ? <Loading /> : "INSCREVER E PARTICIPAR"}
        </button>

    </div>
}