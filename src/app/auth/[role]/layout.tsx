'use client'

import LoadingPage from "@/app/loading";
import PageParams from "@/interfaces/pageparams.interface";
import { useProviders } from "@/providers";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import UnauthenticatedPage from "../unauthenticated";



export default function AdminLayout({ children, params: { role } }: PropsWithChildren<PageParams<{ role: string }>>) {

    const { data, status } = useSession()
    const { profile } = useProviders()
    const userProfile = profile.getProfile()

    const userRoles = userProfile?.roles
    if (status == "unauthenticated") return <UnauthenticatedPage />
    if (status == "loading" || !profile.hasLoaded() || !userRoles) return <LoadingPage />

    return children
}