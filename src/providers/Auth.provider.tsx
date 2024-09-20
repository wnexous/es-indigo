'use client'

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";
import { useProviders } from ".";

const AuthProvider = ({ children, session }: PropsWithChildren<{ session?: Session | null }>) => {

    const { session: auth } = useProviders()

    useEffect(() => {
        if (session) auth.setSession(session.user!)
    }, [])
    return <SessionProvider session={session}>{children}</SessionProvider>

}

export default AuthProvider