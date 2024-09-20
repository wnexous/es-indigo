import apiFrontend from "@/vendors/api-frontend";
import { Button } from "primereact/button";
import { OrderList } from "primereact/orderlist";
import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { MdDone, MdOutlineOpenInNew } from "react-icons/md";
import ProofModal from "./modal";
import { ProofsUserI } from "./page";
import { IoCreate } from "react-icons/io5";

interface PendingListI {
    approveProof: (data: ProofsUserI) => void
    rejectProof: (data: ProofsUserI) => void
    deleteProof: (data: ProofsUserI) => void
}

export default ({ ...props }: PendingListI) => {
    const [modalInfo, setModalInfo] = useState<ProofsUserI>()
    const [proofs, setProofs] = useState<ProofsUserI[]>()
    const closeModal = () => setModalInfo(undefined)


    const approveProof = (data: ProofsUserI) => {
        setProofs(val => val?.filter(i => i.id != data.id))
        props.approveProof(data)
        closeModal()

    }
    const rejectProof = (data: ProofsUserI) => {
        setProofs(val => val?.filter(i => i.id != data.id))
        props.rejectProof(data)
        closeModal()
    }
    const deleteProof = (data: ProofsUserI) => {
        setProofs(val => val?.filter(i => i.id != data.id))
        props.deleteProof(data)
        closeModal()
    }


    useEffect(() => {
        apiFrontend.request.getPendingProofs().then(({ data, metadata }) => {
            setProofs(data)
            // setPagination(metadata)
        })
    }, [])


    const itemTemplate = (item: ProofsUserI) => {

        const ProofsValue = item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        const paiedAt = new Date(item?.createAt as string)
        const createAt = paiedAt.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: "2-digit",
            minute: "2-digit",
        })
        const whatsapp = "https://wa.me/" + item.user.phone.replace(/\D/g, "")
        return (
            <div className="flex items-center justify-between gap-3 max-h-12 text-[12px] sm:text-sm">
                <div className="flex flex-col  xl:mr-8  max-w-[calc(100%-6rem)] sm:min-w-[12rem]" onClick={() => setModalInfo(item)}>
                    <span className="font-bold text-ellipsis overflow-hidden">{item.user.name}</span>
                    <div className="opacity-50 text-ellipsis overflow-hidden ">
                        {item.user.email}
                    </div>
                </div>

                <div className="hidden sm:flex  w-full" onClick={() => setModalInfo(item)}>
                    {ProofsValue}
                </div>
                <a href={whatsapp} target="_blank" className="items-center whitespace-nowrap gap-2 hidden lg:flex  w-full">
                    {item.user.phone}
                    <BsWhatsapp />
                </a>
                <a href={whatsapp} target="_blank" className="items-center w-full whitespace-nowrap gap-2 hidden  sm:flex">
                    {createAt}
                    <IoCreate />
                </a>
                <div className="flex items-center gap-2 text-white">
                    <Button onClick={() => rejectProof(item)} className="bg-red-700 h-fit p-2 !min-w-0">
                        <CgClose />
                        <span className="hidden sm:flex">
                            Rejeitar
                        </span>

                    </Button>
                    <Button data-pr-tooltip="Aprovar" onClick={() => approveProof(item)} className="gradient-2 !min-w-0 w-fit h-fit p-2 ">
                        <MdDone />
                        <span className="hidden sm:flex">
                            Aprovar
                        </span>
                    </Button>
                    <button onClick={() => setModalInfo(item)} className="hidden sm:flex">
                        <MdOutlineOpenInNew size={20} />
                    </button>
                </div>
            </div>
        );
    };

    return <>

        <style>
            {` .p-orderlist-controls{display:none}`}
        </style>
        <OrderList filterPlaceholder="Pesquisar por email" itemTemplate={itemTemplate} dataKey="id" value={proofs} header="Aguardando aprovação" filter filterBy="user.email"></OrderList>
        <ProofModal
            data={modalInfo!}
            onDelete={() => deleteProof(modalInfo!)}
            onApprove={() => { approveProof(modalInfo!) }}
            onReject={() => { rejectProof(modalInfo!) }}
            onClose={closeModal}
        />
    </>
}