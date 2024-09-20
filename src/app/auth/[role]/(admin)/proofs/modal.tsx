import FileViewer from "@/components/FileViewer";
import Loading from "@/components/Loading";
import Text from "@/components/Text";
import { ProofsDBI, SchoolDaysDBI, SchoolDaysI, UserDBI } from "@/interfaces/schemas.interface";
import apiFrontend from "@/vendors/api-frontend";
import downloadFile from "@/vendors/downloadFile";
import getFileExtension from "@/vendors/getFileExtensionByUri";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { MdOutlineOpenInNew, MdPayment } from "react-icons/md";

export default function ProofModal({ data, onApprove, onReject, onDelete, onClose }: { data?: ProofsDBI & { user: UserDBI, schoolDays: SchoolDaysDBI[] }, onReject: VoidFunction, onApprove: VoidFunction, onDelete: VoidFunction, onClose: VoidFunction }) {

    const [proof, setProof] = useState<ProofsDBI & { user: UserDBI }>()

    useEffect(() => {
        if (!data?.id) {
            setProof(undefined)
            return;
        };

        apiFrontend.request.getProof({ id: data.id }).then(({ data }) => {
            setProof(data)
        })
    }, [data])

    // if(!proof) return <></>

    const proofsValue = data?.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const whatsapp = "https://wa.me/" + data?.user.phone.replace(/\D/g, "")
    const FooterElement = () => <div className="flex items-center w-full justify-between">
        <span className="font-bold text-xl">{proofsValue}</span>
        <div className="flex gap-2 flex-wrap justify-end text-white">
            <Button onClick={onDelete} className="bg-red-700 px-3 py-2">Deletar</Button>
            <Button onClick={onReject} className="bg-red-700 px-3 py-2">Rejeitar</Button>
            <Button onClick={onApprove} className="gradient-2 px-3 py-2">Aprovar</Button>
        </div>
    </div>

    const getFileName = (extension: string): string => {
        return (data?.id || data?.user.name.replace(/ /g, "").toLowerCase() || new Date().getTime()) + "." + extension
    }

    const FileView = () => {
        if (!proof) return <Loading className="w-full h-full justify-center bg-indigo-950 animate-pulse rounded-md" />

        const fileExtension = getFileExtension(proof.proofBase64)

        if (!fileExtension) return <></>
        const fileName = getFileName(fileExtension)

        return <FileViewer base64data={proof.proofBase64} fileName={fileName} />
    }

    const download = () => {
        if (!proof) return;

        const [proofType, proofData] = proof.proofBase64.split(",")

        const fileExtension = getFileExtension(proofType)
        if (!fileExtension) return;
        const fileName = getFileName(fileExtension)

        downloadFile({ base64data: proofData, fileName })

    }

    const emailSubject = "[Evento Índigo] Comprovante de pagamento" + (data?.user ? (" de " + data?.user.name) : "")
    const paiedAt = new Date(data?.createAt as string)
    const paiedAtString = paiedAt.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: "2-digit",
        minute: "2-digit",
    })

    const sortShoolDays = (sd: SchoolDaysI[]) => sd.sort((a, b) => {
        const startClassA = new Date(a.startClass).getTime()
        const startClassB = new Date(b.startClass).getTime()

        return (startClassA - startClassB)
    })
    return <Dialog contentStyle={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }} footer={FooterElement} header={data?.user.name} visible={!!data} onHide={() => { if (!data) return; onClose() }}
        className="flex flex-col justify-between w-[min(80vw,700px)] " breakpoints={{ '520px': '100vw', '641px': '100vw' }}>
        <FileView />


        <div className="py-4 flex justify-between flex-wrap gap-4">
            <div>
                <a href={data?.user ? whatsapp : ""} target="_blank" className="items-center gap-2 flex">
                    <BsWhatsapp />
                    {data?.user.phone}
                    <MdOutlineOpenInNew size={12} />
                </a>
                <a className="items-center gap-2 flex" href={"mailto:" + data?.user.email + "?subject=" + emailSubject}>
                    <CgMail />
                    {data?.user.email}
                    <MdOutlineOpenInNew size={12} />
                </a>

                <span className="items-center gap-2 flex">
                    <MdPayment />
                    Pago em: {paiedAtString}
                </span>
                <button className="items-center gap-2 flex underline" onClick={download}>
                    <BiDownload />
                    Baixar arquivo
                </button>
            </div>

            <div>

                <Text className="font-bold!">Aulas cadastradas:</Text>
                {data?.schoolDays && Object.values(sortShoolDays(data.schoolDays)).map((s, i) => {
                    const startAtDate = new Date(s.startClass as string)
                    const startAtString = startAtDate.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                    const endAtDate = new Date(s.endClass as string)
                    const endAtString = startAtDate.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: "2-digit",
                        minute: "2-digit",
                    })

                    return <div className="">
                        <span className="font-bold"> {s.teacherName}</span> {startAtString} até {endAtString}
                    </div>
                }
                )}
            </div>

        </div>
    </Dialog>
}