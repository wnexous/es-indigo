'use client'

import PageParams from "@/interfaces/pageparams.interface";
import { useProviders } from "@/providers";
import { PropsWithChildren } from "react";
import UnauthenticatedPage from "../../unauthenticated";

export default function UserRoleLayout({ children, params }: PropsWithChildren<PageParams<{ role: string }>>) {
    const { profile, session } = useProviders()
    const roles = session.getRoles()
    const { role } = params
    const havePermission = roles?.includes(role)

    if (havePermission) return children
    else return <UnauthenticatedPage />
}