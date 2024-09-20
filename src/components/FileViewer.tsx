import { FileAcceptsType } from "@/config/fileAccepts";
import DocumentNotSupported from "./DocumentNotSupported";
import downloadFile from "@/vendors/downloadFile";
import getFileExtension from "@/vendors/getFileExtensionByUri";
export default function FileViewer({ base64data, fileName }: { base64data: string, fileName: string }) {

    const fileExtension = getFileExtension(base64data) as FileAcceptsType

    const [uri, base64] = base64data.split(",")

    const onRequestDownload = () => {
        downloadFile({ base64data, fileName })
    }

    // Renderizar o componente com base na extensão do arquivo
    if (fileExtension === 'pdf') {
        return <embed src={base64data} type="application/pdf" width="100%" height="600px" />;
    }
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
        return <img src={base64data} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />;
    }
    if (fileExtension === 'html') {
        return <iframe src={base64data} title="HTML Preview" width="100%" height="600px" />;
    }
    if (fileExtension === 'txt') {
        return <pre>{atob(base64)}</pre>;
    }
    if (fileExtension === 'docx') {
        return <DocumentNotSupported fileExtension={fileExtension} onRequestDownload={onRequestDownload} />
    }
    if (fileExtension === 'csv') {
        return <DocumentNotSupported fileExtension={fileExtension} onRequestDownload={onRequestDownload} />
    }
    if (fileExtension === 'xml') {
        return <pre>{atob(base64)}</pre>;
    }

}