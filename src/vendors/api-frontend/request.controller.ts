
import { ProofsChangeData } from "@/app/api/(role)/admin/proofs/put"
import header from "@/config/header"
import { UserProfileI } from "@/interfaces/UserProfile.interface"
import { ApiBackendMetadata__pagination, ApiBackendResponseMetadata } from "@/interfaces/api.backend.interface"
import { FormI } from "@/interfaces/form.interface"
import { ProofsDBI, SchoolDaysDBI, UserDBI } from "@/interfaces/schemas.interface"

export default class RequestController {

    async request<T>({ url, method = "get", body }: { url: string, method?: "post" | "get" | "put" | "delete", body?: any }): Promise<T> {
        body = body ? JSON.stringify(body) : undefined
        const baseUrl = this.getPathname()
        const req = await fetch(`${baseUrl}${url}`, { method, headers: this.getHeader(), body, cache: "no-store", next: { revalidate: 0 } })
        return await req.json()
    }

    getHeader() {
        const header = new Headers()
        return header
    }

    async getProfile(): Promise<UserProfileI> {
        return await this.request({ url: "/api/user/profile" })
    }

    getPathname() {
        if (typeof window !== 'undefined') {
            const host = window.location.origin; // Obtém o endereço do host atual
            return host
        }
    }

    postForm(form: FormI): Promise<UserProfileI & { error?: boolean, issues?: { message: string, path?: string[] }[] }> {
        return this.request({ url: "/api/user/profile", method: "post", body: form })
    }

    async getPendingProofs(): Promise<ApiBackendResponseMetadata<(ProofsDBI & { user: UserDBI, schoolDays: SchoolDaysDBI[] })[], ApiBackendMetadata__pagination>> {
        return await this.request({ url: "/api/admin/proofs/pending", method: "post" })
    }
    async getApprovedProofs(): Promise<ApiBackendResponseMetadata<(ProofsDBI & { user: UserDBI, schoolDays: SchoolDaysDBI[] })[], ApiBackendMetadata__pagination>> {
        return await this.request({ url: "/api/admin/proofs/approved", method: "post" })
    }
    async getRejectedProofs(): Promise<ApiBackendResponseMetadata<(ProofsDBI & { user: UserDBI, schoolDays: SchoolDaysDBI[] })[], ApiBackendMetadata__pagination>> {
        return await this.request({ url: "/api/admin/proofs/rejected", method: "post" })
    }
    async getProof({ id }: { id: string }): Promise<ApiBackendResponseMetadata<(ProofsDBI & { user: UserDBI, schoolDays: SchoolDaysDBI[] }), ApiBackendMetadata__pagination>> {
        return await this.request({ url: "/api/admin/proofs/" + id, method: "post" })
    }
    async deleteProof({ id }: { id: string }): Promise<ApiBackendResponseMetadata<(ProofsDBI & { user: UserDBI, schoolDays: SchoolDaysDBI[] }), ApiBackendMetadata__pagination>> {
        return await this.request({ url: "/api/admin/proofs/" + id, method: "delete" })
    }
    async getChangeProof(data: ProofsChangeData): Promise<ApiBackendResponseMetadata<(ProofsDBI & { user: UserDBI, schoolDays: SchoolDaysDBI[] })[], any>> {
        return await this.request({ url: "/api/admin/proofs", method: "put", body: data })
    }

}