import database from "@/lib/database";
import ProofStatus from "@/config/ proofStatus";
import { ApiBackendMetadata__pagination } from "@/interfaces/api.backend.interface";
import { ProofsDBI, ProofsI, SchoolDaysI, UserI } from "@/interfaces/schemas.interface";
import { v4 } from "uuid";

export default class DatabaseController {

    private Database = database

    getUserByEmail({ email, include }: {
        email: string, include?: Partial<{
            roles: true;
            schoolDays: true;
            proofs: true;
        }>
    }) {

        return this.Database.user.findUniqueOrThrow({ where: { email }, include })
    }

    updateUserProofClassesByUserEmail({ User, schoolDays, proofs }: { User: UserI, schoolDays: SchoolDaysI[], proofs: ProofsI }) {
        const proofUUID = v4()

        const schoolDaysWithProofId = schoolDays.map(s => ({ ...s, proofsId: proofUUID }))
        const proofWithPersonalId = { ...proofs, id: proofUUID }

        return this.Database.user.update({
            where: { email: User.email, AND: { isRegistred: false } },
            data: {
                ...User,
                isRegistred: true,
                proofs: { create: proofWithPersonalId },
                schoolDays: { create: schoolDaysWithProofId, },
            },
            include: {
                roles: true,
                schoolDays: true,
                proofs: true,
            },
        })
    }

    createEmpityUser({ ...user }: UserI) {
        return this.Database.user.create({
            data: {
                ...user,
                roles: { create: { roleName: "user" } }
            }, include: {
                roles: true,
            }
        })
    }


    getPendingProofs({ pageIndex, pageSize }: ApiBackendMetadata__pagination) {
        return this.Database.proofs.findMany({ take: pageSize, skip: pageIndex, where: { status: ProofStatus.pending.proofId }, select: { createAt: true, user: true, id: true, userId: true, status: true, updateAt: true, value: true, schoolDays: true } })
    }
    getAprovedProofs({ pageIndex, pageSize }: ApiBackendMetadata__pagination) {
        return this.Database.proofs.findMany({ take: pageSize, skip: pageIndex, where: { status: ProofStatus.approved.proofId }, select: { createAt: true, user: true, id: true, userId: true, status: true, updateAt: true, value: true, schoolDays: true } })
    }
    getRejectedProofs({ pageIndex, pageSize }: ApiBackendMetadata__pagination) {
        return this.Database.proofs.findMany({ take: pageSize, skip: pageIndex, where: { status: ProofStatus.rejected.proofId }, select: { createAt: true, user: true, id: true, userId: true, status: true, updateAt: true, value: true, schoolDays: true } })
    }
    getProof({ proofId }: { proofId: string }) {
        return this.Database.proofs.findFirstOrThrow({ where: { id: proofId }, include: { schoolDays: true } })
    }
    async deleteProof({ proofId }: { proofId: string }) {
        await this.Database.schoolDays.deleteMany({ where: { proofsId: proofId } })
        const deletedProof = await this.Database.proofs.delete({ include: { user: { include: { proofs: true } } }, where: { id: proofId } })

        if (deletedProof.user && deletedProof.user.proofs.length <= 1) {
            await this.setUserRegistrationStatus({ id: deletedProof.user.id, status: false })
        }

        return deletedProof

    }
    changeProof({ data, id }: { id: string, data: Partial<ProofsDBI> }) {
        return this.Database.proofs.update({ include: { user: true, schoolDays: true }, where: { id }, data })
    }
    setUserRegistrationStatus({ id, status }: { id: string, status: boolean }) {
        return this.Database.user.update({ where: { id: id }, data: { isRegistred: status } })
    }
}