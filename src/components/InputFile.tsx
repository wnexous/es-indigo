import Icons from "@/assets/Icons";
import fileAccepts from "@/config/fileAccepts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import If from "./if";

export interface FileI {
    base64: string
}

export interface InputFileI {
    onChange: (file: FileI | undefined) => void
}

const limiteInMb = 10
const maxSize = limiteInMb * (1024 ** 2); // 1 MB em bytes

export default function InputFile(props: InputFileI) {

    const [fileBase64, setFile] = useState<FileI>()
    const [blockButton, setBlockButton] = useState(false)
    const [error, setError] = useState({
        maxLength: false
    })

    useEffect(() => {
        props.onChange(fileBase64)
    }, [fileBase64])

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBlockButton(true)
        const file = event.target?.files![0]

        if (!file) {
            setFile(undefined);
            setBlockButton(false)
            return;
        }

        if (file.size > maxSize) {
            setError({ maxLength: true })
            setBlockButton(false)
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (f) => {
            const base64 = (reader.result as string)
            setFile({ base64 })
        }

        reader.onloadend = () => {
            setBlockButton(false)
        }
    }

    const accepts = fileAccepts.join(",")
    const successLoadded = fileBase64 != undefined
    const noErros = !Object.keys(error).find((k) => error[k as keyof typeof error])
    const isError = error.maxLength

    const labelRef = useRef<HTMLLabelElement>(null)

    const openFileSelector = () => {
        labelRef.current?.click()
    }
    return <>

        <label data-error={isError || undefined} htmlFor="anexo" ref={labelRef}>
            <button type="button" onClick={openFileSelector} className="data-[error]:bg-red-800 text-start data-[error]:text-white has-[:disabled]:opacity-50 max-w-fit transition-all bg-[#2a283f] text-[14px] leading-4 md:text-xs lg:text-md font-black flex justify-center px-4 lg:px-4 py-2 rounded-sm hover:opacity-70 line-clamp-2 min-w-fit text-[#4f4f70] font-owners items-center gap-2">
                <If conditional={isError}>
                    <div>
                        <Icons.Error width={24} fill={isError ? "#fff" : "#4c4c6d"} />
                    </div>
                    <span className="pt-1">
                        LIMITE MÁXIMO EXCEDIDO ({limiteInMb}MB)
                    </span>

                </If>
                <If conditional={noErros}>
                    <If conditional={successLoadded}>
                        <div>
                            <Icons.Success width={24} fill="#4c4c6d" />
                        </div>
                        <span className="pt-1">
                            CARREGADO COM SUCESSO
                        </span>
                    </If>
                    <If conditional={!successLoadded}>
                        <div >
                            <Icons.Anexo className="h-full w-5 sm:w-3" />
                        </div>
                        <If conditional={blockButton}>
                            <Loading />
                        </If>
                        <If conditional={!blockButton}>
                            <span className="pt-1 sm:pt-0 whitespace-nowrap">
                                ANEXE AQUI SEU
                                <br className="block sm:hidden" /> COMPROVANTE
                            </span>
                        </If>
                    </If>
                </If>
                <input disabled={blockButton} onChange={onChange} className="hidden" id="anexo" type="file" max={1} accept={accepts} />
            </button>
        </label>
    </>
}