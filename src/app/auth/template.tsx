import AuthTemplate from "@/Templates/AuthTemplate";
import { PropsWithChildren } from "react";

export default function AuthT({ children }: PropsWithChildren) {

    return <>
        <AuthTemplate>
            {children}
        </AuthTemplate>
    </>

}