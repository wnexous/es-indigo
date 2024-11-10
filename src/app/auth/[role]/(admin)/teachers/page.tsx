"use client"

import { getAllUsers } from "@/backend/users"
import { User } from "@prisma/client"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { MultiSelect } from "primereact/multiselect"
import { useEffect, useState } from "react"
import SelectRole from "./SelectRole"

export default function TeachersPage() {


    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getAllUsers().then(setUsers)
    }, [])





    return <div>

        <DataTable header={"Professores"} dataKey={"id"} value={users} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Nome do curso"></Column>
            <Column body={SelectRole} field="startClass" header="Inicio"></Column>
        </DataTable>


    </div>
}