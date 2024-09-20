'use client'

import { SchoolDaysI } from "@/interfaces/schemas.interface"


export default function SchoolDay({ ...props }: SchoolDaysI) {

    const startHour = new Date(props.startClass).getHours()
    const startMinute = new Date(props.startClass).getMinutes()

    const endHour = new Date(props.endClass).getHours()
    const endMinute = new Date(props.endClass).getMinutes()


    const day = new Date(props.endClass).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        weekday: "short"
    })

    return (
        <div className="flex gap-3 items-center w-full text-[12px] sm:text-sm" >
            <span className="w-full justify-between flex gap-2">
                <span className="w-full">
                    {day}
                </span>
                <span className="w-full">{`${startHour}h${startMinute != 0 ? startMinute : ""} até ${endHour}h${endMinute != 0 ? endMinute : ""}`}</span>
                <span className="font-black font-owners text-end w-full">
                    {props.teacherName.toUpperCase()}
                </span>
            </span>
        </div>
    )
}




