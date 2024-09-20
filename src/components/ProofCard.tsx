import { ProofsDBI, UserDBI } from "@/interfaces/schemas.interface";
import { Button } from "primereact/button";
import { Card } from "primereact/card";


interface ProofCardI {
    data: ProofsDBI & { user: UserDBI }
    onApprove: VoidFunction
    onReject: VoidFunction
    onClick: VoidFunction
}
export default function ProofCard({ data, onApprove: onAprove, onReject, onClick }: ProofCardI) {
    const subtitle = <div className="flex flex-col"><span>{data.user.email}</span> <span>{data.user.phone}</span></div>
    const ProofsValue = data.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    const footer = <div className="flex flex-col gap-3 items-center w-full justify-between">

        <div className=" flex gap-2 items-center justify-between w-full">
            <span className="font-bold text-xl">{ProofsValue}</span>
            <Button onClick={onClick} className="underline w-fit  py-2  text-end whitespace-nowrap">Abrir comprovante</Button>
        </div>

        <div className="flex-grow flex gap-2 w-full">
            <Button onClick={onReject} className="bg-red-700 px-3 py-2 flex-grow">Rejeitar</Button>
            <Button onClick={onAprove} className="gradient-2 px-3 py-2 flex-grow">Aprovar</Button>
        </div>

    </div>
    return <Card footer={footer} title={data.user.name} subTitle={subtitle} className="basis-72 flex-grow" />
}
