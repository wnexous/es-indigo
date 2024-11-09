'use client'

import { ClassCheckboxI } from "@/config/teachers"
import { useState } from "react"
import Text from "./Text"

interface checkboxinterface extends ClassCheckboxI {
    id: string
    horario: string
    onChangeState?: (teacher: ClassCheckboxI, state: boolean) => void
    state: boolean
}

export default function Checkbox({ onChangeState = () => { }, ...props }: checkboxinterface) {

    const [state, setState] = useState(props.state)

    const changeState = () => {
        const newState = !state
        setState(newState)
        onChangeState(props, newState)
    }


    const startHour = (props.startClass as Date).getHours()
    const startMinute = (props.startClass as Date).getMinutes()

    const endHour = (props.endClass as Date).getHours()
    const endMinute = (props.endClass as Date).getMinutes()

    const CheckInput = () => {
        return <>
            <button onClick={changeState} className={`min-w-7 h-7 text-md cursor-pointer  overflow-hidden rounded-sm relative bg-[#2a283f] flex items-center justify-center`} >
                {state && <>&#x2713;</>}
            </button>
        </>
    }

    return (
        <label className="flex gap-3 items-center w-full" htmlFor={props.id} onClick={changeState}>
            <CheckInput />
            <span className="w-full justify-between flex gap-2">
                <Text className="text-[12px] sm:text-[14px] ">{`${startHour}h${startMinute != 0 ? startMinute : ""} até ${endHour}h${endMinute != 0 ? endMinute : ""}`}</Text>
                <span className="font-black font-owners text-end">
                    {props.teacherName.toUpperCase()}
                </span>
            </span>
        </label>
    )
}




