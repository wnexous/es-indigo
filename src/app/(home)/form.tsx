'use client'

import Heading from "@/components/Heading";
import { FileI } from "@/components/InputFile";
import SubmitForm from "@/components/SubmitForm";
import Text from "@/components/Text";
import If from "@/components/if";
import Input, { InputValidStateI } from "@/components/input";
import { ClassCheckboxI } from "@/config/teachers";
import LoginProviderI from "@/interfaces/LoginProviders.interface";
import { FormI } from "@/interfaces/form.interface";
import { useProviders } from "@/providers";
import apiFrontend from "@/vendors/api-frontend";
import calculateClassesValue from "@/vendors/calculateClassesValue";
import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Courses from "./courses";

const MockForm: FormI & { checkbox: ClassCheckboxI[] } = {
    name: "",
    phone: "",
    checkbox: [],
    proof: {
        value: 0,
        proofBase64: ""
    }
}

export default function HomeForm() {

    const getInitialFormState = (): FormI => {
        const stringfyItem = window.localStorage.getItem("home-form")

        if (!stringfyItem) return MockForm

        try {
            const parsedData = JSON.parse(stringfyItem)
            return { ...MockForm, ...parsedData }
        } catch (error) { }
        return MockForm
    }

    const initialFormState = getInitialFormState()

    const saveFormState = (form: FormI) => {
        const data: Partial<FormI> = {
            name: form.name,
            phone: form.phone,
            checkbox: form.checkbox,
        }
        const stringfiedItem = JSON.stringify(data)
        window.localStorage.setItem("home-form", stringfiedItem)
    }

    const { profile, session } = useProviders()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ message: string, path?: string[] }[]>()
    const [providers, setProviders] = useState<LoginProviderI>()
    const [inputStates, setInputStates] = useState<{ name: InputValidStateI, phone: InputValidStateI }>({} as any)
    const [formState, setFormState] = useState<FormI>(initialFormState)
    const [enableButton, setEnableButton] = useState(true)

    useEffect(() => { getProviders().then(setProviders) }, [])
    useEffect(() => {
        const formData = getInitialFormState()
        setFormState(formData)
    }, [])

    const [totalCost, setTotalCost] = useState(0)
    const isLogged = session.isLogged()

    useEffect(() => {
        let cost = calculateClassesValue(formState.checkbox.length)
        setTotalCost(cost)
        saveFormState(formState)

    }, [formState])

    const changeFormState = (key: keyof typeof formState, value: any) => {
        setFormState((oldValue) => ({ ...oldValue, [key]: value }))
    }
    const changeInputState = (key: keyof typeof formState, state: { value: string; isValid?: boolean; }) => {
        setInputStates((oldValue) => ({ ...oldValue, [key]: state }))
        changeFormState(key, state.value)
    }
    const onSubmit = () => {
        setIsLoading(true)
        setEnableButton(false)
        if (!formState) return;

        apiFrontend.request.postForm(formState)
            .then((response) => {
                if (response.error) {
                    setErrors(response.issues)
                }
                else {
                    if (response.email) {
                        window.localStorage.setItem("home-form", "")
                        profile.setProfile(response)
                    }
                }
            })
            .catch(console.log)
            .finally(() => {
                setIsLoading(false)
                setEnableButton(true)
            })
    }

    const onInputFile = (file: FileI | undefined) => {
        if (file) {
            changeFormState("proof", {
                value: (totalCost),
                proofBase64: file.base64
            })
        }
        else {
            changeFormState("proof", initialFormState.proof)
        }
    }
    const getErrorMessage = (field: string): string | undefined => {
        if (!errors) return;

        const fieldError = errors.find(f => f.path?.includes(field))
        if (!fieldError) return;

        return fieldError.message

    }

    return <form className="lg:w-[480px]  w-full flex flex-col gap-3 my-auto" action={onSubmit}>
        <div className="flex flex-col gap-2 text-[12px] sm:text-sm">
            <Heading as="h1">INSCREVA-SE</Heading>
            <Text>Bem-vindo ao Índigo, preencha o formulário abaixo para completar sua inscrição e participar do evento. </Text>
        </div>
        <div className="flex flex-col gap-5 my-4">
            <Input errorMessage={getErrorMessage("name")} onChange={value => changeInputState("name", value)} placeholder="NOME" value={formState.name} validator="name" type="text" />
            <Input errorMessage={getErrorMessage("phone")} onChange={value => changeInputState("phone", value)} placeholder="TELEFONE" value={formState.phone} validator="telefone" type="tel" />
            <Courses />
        </div>

        {getErrorMessage("checkbox") && <span className="text-red-500 text-[12px]">{getErrorMessage("checkbox")}</span>}

        <SubmitForm inputfileErrorMessage={getErrorMessage("proof")} isLoading={isLoading} onInputFile={onInputFile} enableSubmitButton={enableButton} isLogged={isLogged} providers={providers} />
        <If conditional={isLogged}>
            <p className="text-[10px] text-neutral-400">
                Deseja trocar de conta? <a className="underline text-[#9767fe]" href="/signout">clique aqui</a>
            </p>
        </If>
    </form>
}