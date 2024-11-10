'use client'

import InputValidator from "@/vendors/InputValidator"
import { ChangeEventHandler, HTMLInputTypeAttribute, useEffect, useState } from "react"

interface InputInterface {
    placeholder: string
    type?: HTMLInputTypeAttribute
    validator: keyof typeof InputValidator
    value?: string
    onChange: (value: InputValidStateI) => void
    errorMessage?: string
}

export interface InputValidStateI {
    value: string;
    isValid?: boolean;
}

export default function Input({ value = "", ...props }: InputInterface) {
    const validator = InputValidator[props.validator]


    const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const replacedValue = validator(target.value)
        props.onChange(replacedValue)
    }

    useEffect(() => {
        const replacedValue = validator(value)
        props.onChange(replacedValue)
    }, [])

    return <div>
        <input value={value} onChange={onChange} placeholder={props.placeholder} type={(props.type ?? "text")} className="bg-[#2a283d] py-2 text-[12px] sm:text-sm px-2 w-full rounded-sm font-owners placeholder:text-[#4f4f70]" />
        {props.errorMessage && <span className="text-red-500 text-[12px]">{props.errorMessage}</span>}
    </div>
}