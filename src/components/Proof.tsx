import { getProofTextById } from "@/config/ proofStatus";
import { ProofsI } from "@/interfaces/schemas.interface";
import downloadFile from "@/vendors/downloadFile";
import getFileExtension from "@/vendors/getFileExtensionByUri";
import { Tooltip } from "primereact/tooltip";
import { BsDownload } from "react-icons/bs";
import { v4 } from "uuid";

export default function Proof({ value, createAt, status, token, ...props }: ProofsI) {

    const proofsValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    const createAtDate = new Date(createAt as string)
    const paiedAt = createAtDate.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: "2-digit",
        minute: "2-digit",
    })

    if (status == undefined) return <></>
    const statusText = getProofTextById(status as any)


    const getFileName = (extension: string) => {
        return new Date().getTime() + "." + extension
    }
    const download = () => {
        const [proofType, proof] = props.proofBase64.split(",")
        const fileExtension = getFileExtension(proofType)
        if (!fileExtension) return;

        const fileName = getFileName(fileExtension)

        downloadFile({ base64data: proof, fileName })

    }

    const rowUUID = v4()

    return <>
        <div className="flex justify-between gap-0 items-center ">
            <span className="w-full min-w-[5rem] sm:max-w-[5rem] md:max-w-[5rem]">
                {proofsValue}
            </span>
            <span data-uuid={rowUUID} className="w-full min-w-[7rem] sm:max-w-[14rem]  md:max-w-full text-ellipsis overflow-hidden">
                {token}
            </span >
            <span className="font-bold flex w-full max-w-[7rem]  ">
                {statusText}
            </span>
            <button className="flex items-center gap-1 w-full justify-end max-w-[2rem] bg-transparent " onClick={download}>
                <BsDownload size={16} />
            </button>
        </div>
        <Tooltip target={`[data-uuid="${rowUUID}"]`} position="bottom" mouseTrack mouseTrackTop={10} >
            Token: {token}
        </Tooltip>
    </>
}