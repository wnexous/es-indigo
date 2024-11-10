import fileAccepts from '@/config/fileAccepts';
import getFileExtension from '@/vendors/getFileExtensionByUri';
import { z } from 'zod';

const enrollSchema = z.object({
    name: z
        .string({ message: "Nome não informado." })
        .min(3, { message: "Nome deve conter ao menos 3 caracteres." })
        .max(64, { message: "Nome deve conter no máximo 64 caracteres." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Nome deve conter apenas letras e espaços." }),

    phone: z
        .string({ message: "Número de telefone não informado." })
        .min(10, { message: "Número de telefone deve conter ao menos 10 dígitos." })
        .max(15, { message: "Número de telefone deve conter no máximo 15 dígitos." })
        .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: "Número de telefone deve ser válido e pode incluir o código do país." }),

    courses: z.array(z.object({
        id: z
            .string({ message: "o id da aula precisa ser uma string" }),
    }))
        .min(1, { message: "É necessário selecionar ao menos uma aula" }),

    proof: z.object({
        proofBase64: z
            .string({ message: "Documento em Base64 não informado." })
            .refine(data => {
                return data.length > 0
            }, { message: "Você deve incluir o comprovante de pagamento" })
            .refine((data) => {
                const fileExtension = getFileExtension(data)
                if (!fileExtension) return false;
                return fileAccepts.includes("." + fileExtension)
            }, { message: "Formato de arquivo inválido" })
            .refine((data) => {
                const sizeInBytes = (data.length * 3) / 4 - (data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0);
                return sizeInBytes <= 10 * 1024 * 1024; // 1MB em bytes
            }, { message: "O arquivo deve ter no máximo 1MB." }),

        value: z
            .number({ message: "Preço do documento não informado." })
            .refine((val) => val > 0, { message: "Preço deve ser maior que zero." }),
    })
});


export default enrollSchema