import { createInputValidator } from "./controller";

export default {
    telefone: createInputValidator((phoneNumber) => {
        // Remove todos os caracteres que não são dígitos
        const cleaned = phoneNumber.replace(/\D/g, '');

        // Limita o número de dígitos a 11 (máximo para telefone brasileiro)
        const limited = cleaned.substring(0, 11);

        // Verifica a validade e formata conforme o comprimento
        if (limited.length === 10) {
            return {
                value: limited.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'),
                isValid: true
            };
        } else if (limited.length === 11) {
            return {
                value: limited.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
                isValid: true
            };
        }

        return {
            value: limited,
            isValid: false
        };
    }),
    name: createInputValidator((name) => {
        // Remove espaços extras e valida o formato do nome


        return {
            value: name.trimStart().substring(0, 64),
            isValid: name.length > 0 && name.length <= 64
        };

    })
}