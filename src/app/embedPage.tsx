'use client'

import IndigoTemplate from "@/Templates/IndigoTemplate";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import If from "@/components/if";
import detectMobile from "@/vendors/detectMobile";
import { FaChrome, FaEdge, FaFirefox, FaOpera, FaSafari } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function EmbedPage() {

    const isMobile = detectMobile()
    const origin = window.location.origin

    return <IndigoTemplate>
        <div className="flex flex-col gap-4 h-full justify-start sm:justify-center max-w-[420px]">
            <div className="flex flex-col gap-2">
                <Heading as="h1" >Cadastro</Heading>
                <Text>
                    Para mais segurança em seu cadastro, precisamos que acesse nosso site através de um navegador seguro como:
                </Text>
            </div>
            <ul>
                <li className="flex items-center gap-2"><FaChrome /> <Text>Chrome</Text></li>
                <li className="flex items-center gap-2"><FaSafari /><Text> Safari</Text></li>
                <li className="flex items-center gap-2"><FaFirefox /><Text> Firefor</Text></li>
                <li className="flex items-center gap-2"><FaOpera /> <Text>Opera</Text></li>
                <li className="flex items-center gap-2"><FaEdge /><Text> Edge</Text></li>
            </ul>
            <Text className="">
                Clique nos 3 pontinhos &#x22EE; no canto superior direito em selecione a opção para abrir no Chrome.
            </Text>
            {/* <If conditional={isMobile}>
                <button onClick={openAnotherPage} className="p-2 gradient text-center rounded-sm text-indigo font-black font-owners w-full sm:w-fit text-[12px] sm:text-sm">Abrir em outro navegador</button>
            </If> */}
        </div>
    </IndigoTemplate>
}