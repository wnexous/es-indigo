import { FileAcceptsType } from "@/config/fileAccepts";
import mime from "mime-types";
export default function getFileExtension(base64: string): FileAcceptsType | undefined {

    const [base64URI, base64Data] = base64.split(",")
    let fileType: string | undefined

    if (base64URI.startsWith("data:")) {
        const fileTypeMatcher = base64URI.match(/^data:(.*);base64/)
        fileType = fileTypeMatcher?.[1]
    }
    else {
        fileType = base64URI
    }

    if (!fileType) return;

    const fileExtension = mime.extension(fileType)

    return fileExtension as FileAcceptsType || undefined
}