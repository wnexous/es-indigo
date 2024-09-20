import Proof from "@/components/Proof"
import SchoolDay from "@/components/schoolDay"
import links from "@/config/links"
import { useProviders } from "@/providers"
import { Divider } from "primereact/divider"

export default function VoucherProofs() {
    const { profile } = useProviders()
    const userProofs = profile.getProofs()

    return <>

        <div className="flex flex-col gap-2 text-[12px] sm:text-sm">
            <h1 className="text-3xl font-bold font-owners lg:text-5xl">PAGAMENTOS</h1>
            <p>Acompanhe o status de confirmação de pagamento. A confirmação pode demorar até 48 horas, em caso de dúvida, contate-nos pelo <a className="underline" target="_blank" href={links.whatsapp}>WhatsApp 41 99764-3046</a>.</p>
        </div>

        <div className="my-4 flex flex-col gap-2 w-full text-[12px] sm:text-sm whitespace-nowrap">
            <div className="w-full flex justify-between gap-0">
                <span className="w-full min-w-[5rem] sm:max-w-[5rem] md:max-w-[5rem]">Valor</span>
                <span className="w-full min-w-[7rem] sm:max-w-[14rem] md:max-w-full">Token</span>
                <span className="w-full flex max-w-[7rem] ">Confirmação</span>
                <span className="w-full max-w-[2rem]"></span>
            </div>

            {userProofs && Object.values(userProofs).map((p, k) =>
                <Proof {...p} key={k} />
            )}
        </div>
        <p className="text-[10px] text-neutral-400">
            Deseja trocar de conta? <a className="underline text-[#9767fe]" href="/signout">clique aqui</a>
        </p>
    </>
}