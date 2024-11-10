"use client"

import { getAllCoursesWithTeacher } from "@/backend/courses"
import CoursesTeacherModel from "@/models/courses-teacher.model"
import { MultiSelect } from "primereact/multiselect"
import { useEffect, useState } from "react"
import "./style.css"

interface CoursesI {
    onChange: (courses: { value: CoursesTeacherModel[]; isValid?: boolean; }) => void
    errorMessage?: string
}

export default function Courses(props: CoursesI) {

    const [coursesData, setCoursesData] = useState<CoursesTeacherModel[]>([])
    const [selecteds, setSelecteds] = useState<CoursesTeacherModel[]>([])

    useEffect(() => {
        getAllCoursesWithTeacher()
            .then(setCoursesData)
    }, [])

    useEffect(() => {
        props.onChange({ isValid: selecteds.length == 0, value: selecteds })
    }, [selecteds])

    const optionTemplate = (item: CoursesTeacherModel) => <div className="w-full flex justify-between items-center">
        <div className="flex flex-col w-full">
            <div className="font-bold">
                {item.courseName}
            </div>
            <div className="text-xs">
                {item.teacher.name}
            </div>
        </div>
        <div>
            {
                new Intl.NumberFormat("pt-BR", {
                    style: 'currency',
                    currency: "BRL",
                }).format(item.price)
            }
        </div>
    </div>

    return <div>
        <MultiSelect
            filter
            className="bg-[#2a283d] border-none w-full font-owners placeholder:font-owners text-[#4f4f70]"
            placeholder="Curso"
            itemClassName="flex multi-item"
            options={coursesData}
            optionLabel="courseName"
            itemTemplate={optionTemplate}
            value={selecteds}
            onChange={({ value }) => { setSelecteds(value) }}
        />
        {props.errorMessage && <span className="text-red-500 text-[12px]">{props.errorMessage}</span>}
    </div>
}