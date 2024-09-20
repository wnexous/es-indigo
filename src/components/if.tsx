'use client'
import { PropsWithChildren } from "react";
import ClientComponent from "./ClientComponent";

export default function If({ conditional, children }: PropsWithChildren<{ conditional: boolean }>) {

    return <ClientComponent>
        {(conditional ? children : <></>)}
    </ClientComponent>
}