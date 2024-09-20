'use client'

import Heading from "@/components/Heading";
import { FileI } from "@/components/InputFile";
import SubmitForm from "@/components/SubmitForm";
import Text from "@/components/Text";
import Checkbox from "@/components/checkbox";
import Input, { InputValidStateI } from "@/components/input";
import teachers, { ClassCheckboxI } from "@/config/teachers";
import LoginProviderI from "@/interfaces/LoginProviders.interface";
import { FormI } from "@/interfaces/form.interface";
import { useProviders } from "@/providers";
import apiFrontend from "@/vendors/api-frontend";
import calculateClassesValue from "@/vendors/calculateClassesValue";
import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";


interface HomeFormI {
}

const MockForm: FormI & { checkbox: ClassCheckboxI[] } = {
    name: "",
    phone: "",
    checkbox: [],
    proof: {
        value: 0,
        proofBase64: ""
    }
}

export default function HomeForm(props: HomeFormI) {

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
        // setEnableButton(
        //     !!inputStates?.name?.isValid &&
        //     !!inputStates?.phone?.isValid &&
        //     formState.checkbox.length > 0 &&
        //     formState.proof.proofBase64.length > 0
        // )
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
    const onChangeCheckbox = (teacher: ClassCheckboxI, state: boolean) => {
        let checkboxArray = formState.checkbox
        const { endClass, startClass, teacherName } = teacher
        if (state) {
            if (!checkboxArray.find(c => c.teacherName == teacher.teacherName))
                checkboxArray.push({ endClass, startClass, teacherName })
        } else {
            checkboxArray = checkboxArray.filter(i => i.teacherName != teacher.teacherName)
        }

        changeFormState("checkbox", checkboxArray)
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
    const getCheckboxState = (checkbox: ClassCheckboxI) => {
        return !!formState.checkbox.find(f => f.teacherName == checkbox.teacherName)
    }

    return <form className="lg:w-[480px]  w-full flex flex-col gap-3 my-auto" action={onSubmit}>
        <div className="flex flex-col gap-2 text-[12px] sm:text-sm">
            <Heading as="h1">INSCREVA-SE</Heading>
            <Text>Bem-vindo ao Índigo, preencha o formulário abaixo para completar sua inscrição e participar do evento. </Text>
        </div>
        <div className="flex flex-col gap-5 my-4">
            <Input errorMessage={getErrorMessage("name")} onChange={value => changeInputState("name", value)} placeholder="NOME" value={formState.name} validator="name" type="text" />
            <Input errorMessage={getErrorMessage("phone")} onChange={value => changeInputState("phone", value)} placeholder="TELEFONE" value={formState.phone} validator="telefone" type="tel" />
        </div>
        <div className="flex text-[12px] sm:text-sm flex-col xl:flex-row gap-4 lg:justify-between justify-around">
            <div className="flex flex-col gap-1.5 xl:gap-3">
                <p className="font-bold font-owners text-[12px] ">AULAS NO SÁBADO | 14.09</p>
                <Checkbox {...teachers.erick} state={getCheckboxState(teachers.erick)} horario="13h até 14h10" onChangeState={onChangeCheckbox} />
                <Checkbox {...teachers.max} state={getCheckboxState(teachers.max)} horario="14h20 até 15h30" onChangeState={onChangeCheckbox} />
                <Checkbox  {...teachers.kaih} state={getCheckboxState(teachers.kaih)} horario="15h40 até 16h50" onChangeState={onChangeCheckbox} />
                <Checkbox  {...teachers.clau} state={getCheckboxState(teachers.clau)} horario="17h até 18h10" onChangeState={onChangeCheckbox} />
            </div>
            <div className="flex flex-col gap-1.5 xl:gap-3">
                <p className="font-bold font-owners text-[12px] ">AULAS NO DOMINGO | 15.09</p>
                <Checkbox {...teachers.gabe} state={getCheckboxState(teachers.gabe)} horario="11h20 até 12h30" onChangeState={onChangeCheckbox} />
                <Checkbox  {...teachers.gaby} state={getCheckboxState(teachers.gaby)} horario="13h até 14h10" onChangeState={onChangeCheckbox} />
                <Checkbox  {...teachers.ally} state={getCheckboxState(teachers.ally)} horario="14h20 até 15h30" onChangeState={onChangeCheckbox} />
                <Checkbox  {...teachers.jhow} state={getCheckboxState(teachers.jhow)} horario="15h40 até 16h50" onChangeState={onChangeCheckbox} />
                <Checkbox  {...teachers.italo} state={getCheckboxState(teachers.italo)} horario="17h40 até 18h10" onChangeState={onChangeCheckbox} />
            </div>
        </div>
        {getErrorMessage("checkbox") && <span className="text-red-500 text-[12px]">{getErrorMessage("checkbox")}</span>}

        <SubmitForm inputfileErrorMessage={getErrorMessage("proof")} isLoading={isLoading} onInputFile={onInputFile} enableSubmitButton={enableButton} isLogged={isLogged} providers={providers} />
        <p className="text-[10px] text-neutral-400">
            Deseja trocar de conta? <a className="underline text-[#9767fe]" href="/signout">clique aqui</a>
        </p>
    </form>
}