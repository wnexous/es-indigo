'use client'
import { ProofsDBI, SchoolDaysDBI, UserDBI } from "@/interfaces/schemas.interface"
import apiFrontend from "@/vendors/api-frontend"
import { useEffect, useState } from "react"
import ApprovedList from "./ApprovedList"
import PendingList from "./PendingList"
import RejectedList from "./RejectedList"
import ProofModal from "./modal"
import { TabMenu } from "primereact/tabmenu"
import { MenuItem } from "primereact/menuitem"
import { courses } from "@prisma/client"

export type ProofsUserI = ProofsDBI & { user: UserDBI, courses: courses[] }


export default function AdminPage() {

    const menuItem: MenuItem[] = [
        { label: "Pendentes", id: "pending" },
        { label: "Aprovados", id: "approved" },
        { label: "Reprovados", id: "rejected" },
    ]
    const [currentMenu, setCurrentMenu] = useState<number>(0)
    const currentMenuData = menuItem[currentMenu]

    const rejectProof = ({ id }: ProofsUserI) => {
        apiFrontend.request.getChangeProof({ id: id!, data: { status: "rejected" } })
    }
    const approveProof = ({ id, }: ProofsUserI) => {
        apiFrontend.request.getChangeProof({ id: id!, data: { status: "approved" } })
    }
    const deleteProof = ({ id, }: ProofsUserI) => {
        console.log('id', id)
        apiFrontend.request.deleteProof({ id: id! })
    }

    return <>
        <div className="flex flex-col gap-2 text-[12px] sm:text-[14px] md:text-sm mb-8">
            <h1 className="text-xl sm:text-2xl font-bold font-owners lg:text-5xl">COMPROVANTES</h1>
            <p>Valide o comprovante de pagamento dos participantes do evento</p>
        </div>

        <TabMenu activeIndex={currentMenu} model={menuItem} onTabChange={tab => setCurrentMenu(tab.index)} className="mb-4 text-[12px] sm:text-[16px]" />

        <div className="flex flex-col gap-8">
            {currentMenuData.id == "pending" && <PendingList deleteProof={deleteProof} approveProof={approveProof} rejectProof={rejectProof} />}
            {currentMenuData.id == "approved" && <ApprovedList deleteProof={deleteProof} approveProof={approveProof} rejectProof={rejectProof} />}
            {currentMenuData.id == "rejected" && <RejectedList deleteProof={deleteProof} approveProof={approveProof} rejectProof={rejectProof} />}
        </div>
    </>
}