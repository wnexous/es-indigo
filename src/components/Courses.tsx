'use client'

import { courses } from "@prisma/client"


export default function Courses({ ...props }: courses) {

    const startHour = new Date(props.startClass).getHours()
    const startMinute = new Date(props.startClass).getMinutes()

    const endHour = new Date(props.endClass).getHours()
    const endMinute = new Date(props.endClass).getMinutes()

    const endDay = new Date(props.endClass).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        weekday: "short",
        year: "2-digit"
    })

    const startDay = new Date(props.startClass).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        weekday: "short",
        year: "2-digit"
    })

    console.log('props.teacherId', props.teacherId)

    return (
        <div className="flex gap-3 items-center w-full text-[12px] sm:text-sm" >


            <span className="w-full justify-between flex gap-2">

                <span className="font-black font-owners text-start w-full">
                    {props.courseName}
                </span>

                <span className="w-full text-end">
                    {endDay} - {startDay}
                </span>
                {/* <span className="w-full">{`${startHour}h${startMinute != 0 ? startMinute : ""} até ${endHour}h${endMinute != 0 ? endMinute : ""}`}</span> */}

            </span>
        </div>
    )
}




