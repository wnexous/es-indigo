"use client"

import { createCourse, deleteCourse, editCourse, getAllCourses } from "@/backend/courses"
import { getAllTeachers } from "@/backend/users"
import If from "@/components/if"
import CoursesModel from "@/models/courses.model"
import UserModel from "@/models/User.model"
import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import { RiDeleteBin2Line } from "react-icons/ri"

type ModalStatesT = "edit" | "create"
export default function Courses() {

    const [coursesData, setCourses] = useState<CoursesModel[]>([])
    const [teachersData, setTeachers] = useState<UserModel[]>([])
    const [selected, setSelected] = useState<CoursesModel>()
    const [modalState, setModalState] = useState<ModalStatesT>()

    const fetchData = () => getAllCourses().then(setCourses)
    const openModal = (state: ModalStatesT, data: CoursesModel) => {
        setModalState(state)
        setSelected(data)
    }

    const deleteDate = (id: string) => {
        deleteCourse(id)
            .then(fetchData)
            .catch()
            .finally(() => setModalState("create"))
    }

    useEffect(() => {
        fetchData()

        getAllTeachers()
            .then(setTeachers)
            .catch()
    }, [])


    const value = coursesData?.map(c => ({
        ...c,
        startClass: c.startClass.toLocaleString(),
        endClass: c.endClass.toLocaleString(),
        price: new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: "BRL",
        }).format(c.price)
    }))

    const sendData = async () => {
        if (!selected) return;

        if (modalState == "create") await createCourse(selected).then(() => setModalState("edit"))
        if (modalState == "edit") await editCourse(selected.id as string, selected)
        fetchData()
    }

    const changeData = (field: keyof CoursesModel, data: any) => {
        setSelected(v => ({ ...v, [field]: data } as any))
    }

    const closeModal = () => setSelected(undefined)

    const footer = <div>
        <If conditional={modalState == "edit"}>
            <Button onClick={() => deleteDate(selected?.id as string)} severity="danger" >
                Deletar
            </Button>
        </If>
        <Button onClick={sendData} >
            {modalState == "create" && "Criar"}
            {modalState == "edit" && "Editar"}
        </Button>
    </div>
    const header = <div className="flex items-center justify-between">
        <span>
            Cursos
        </span>
        <Button onClick={() => { openModal("create", new CoursesModel()) }}>
            Cadastrar
        </Button>
    </div>

    const deleteTemplate = (data: CoursesModel) => {
        if (!data?.id) return <></>

        return <button onClick={() => deleteDate(data.id as string)} className="bg-transparent border-none cursor-pointer"><RiDeleteBin2Line /></button>
    }

    const getUserById = (userId: string) => teachersData.find(t => t.id == userId)

    const getCourseById = (id: string) => coursesData?.find((c: any) => c.id == id) as CoursesModel
    return <div>
        <DataTable header={header} dataKey={"id"} selectionMode={"single"} selection={selected} onRowUnselect={closeModal} onSelectionChange={e => openModal("edit", getCourseById(e.value.id))} value={value} tableStyle={{ minWidth: '50rem' }}>
            <Column field="courseName" header="Nome do curso"></Column>
            <Column field="startClass" header="Inicio"></Column>
            <Column field="endClass" header="Finalização"></Column>
            <Column field="price" header="preço"></Column>
            <Column header="Deletar" body={deleteTemplate}></Column>
        </DataTable>

        <Dialog resizable footer={footer} header={"Cursos"} visible={!!selected} onHide={() => { setSelected(undefined) }}>
            <div className="flex flex-col gap-4">
                <InputText onChange={(e) => changeData("courseName", e.target.value)} value={selected?.courseName} placeholder="Nome do curso" />
                <Calendar onChange={(e) => changeData("startClass", e.target.value)} value={new Date(selected?.startClass ?? "")} placeholder="Data de inicio" />
                <Calendar onChange={(e) => changeData("endClass", e.target.value)} value={selected?.endClass} placeholder="Data de fim" />
                <InputNumber onChange={(e) => changeData("price", e.value)} prefix="R$ " currency="BRL" locale="pt-BR" value={selected?.price} placeholder="Preço" maxFractionDigits={2} minFractionDigits={2} />
                <Dropdown value={getUserById(selected?.teacherId as string)} placeholder="Professor" onChange={e => changeData("teacherId", e.value.id)} options={teachersData} optionLabel="name" />
            </div>
        </Dialog>
    </div >
};
