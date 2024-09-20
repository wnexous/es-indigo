const proofStatus = {
    pending: {
        proofId: "pending",
        proofText: "Pendente"
    },
    approved: {
        proofId: "approved",
        proofText: "Aprovado"
    },
    rejected: {
        proofId: "rejected",
        proofText: "Reprovado"
    },
}

export default proofStatus

export const getProofTextById = (id: keyof typeof proofStatus): string | undefined => {
    if (!proofStatus[id]) return;

    return proofStatus[id].proofText
}