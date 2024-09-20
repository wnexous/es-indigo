'use client'

import SchoolDay from "@/components/schoolDay";
import { SchoolDaysI } from "@/interfaces/schemas.interface";
import { useProviders } from "@/providers";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import VoucherClasses from "./voucher.classes";
import VoucherProofs from "./voucher.proofs";

export default function VoucherHome() {

    const { profile, session } = useProviders()
    const userProfile = profile.getProfile()
    const { schoolDays } = userProfile

    const [currentMenu, setCurrentMenu] = useState(0)

    const itemTemplate = (item: SchoolDaysI) => {
        return <SchoolDay {...item} />
    }

    const menuItem: MenuItem[] = [
        { label: "Minha agenda", id: "classes" },
        { label: "Pagamentos", id: "proofs" },
    ]

    const currentMenuItem = menuItem[currentMenu]

    return <section className="lg:w-[460px]  w-full flex flex-col gap-3 my-auto">

     
        <TabMenu activeIndex={currentMenu} model={menuItem} onTabChange={tab => setCurrentMenu(tab.index)} className="mb-4" />

        {currentMenuItem.id == "classes" && <VoucherClasses />}
        {currentMenuItem.id == "proofs" && <VoucherProofs />}

    </section>
}