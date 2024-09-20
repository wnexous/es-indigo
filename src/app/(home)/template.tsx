import IndigoTemplate from "@/Templates/IndigoTemplate";
import { PropsWithChildren } from "react";

export default function HomeTemplate(props: PropsWithChildren) {


    return <>
        <IndigoTemplate>
            {props.children}
        </IndigoTemplate>
    </>

}