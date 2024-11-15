
import { UserProfileI } from '@/interfaces/UserProfile.interface'
import { UserProfileCompleteI } from '@/interfaces/database.interface'
import { type NextRequest } from 'next/server'
export default class DataController {
    async getBodyData<T>(req: NextRequest): Promise<T> {
        return await req.json()
    }
    parseUserProfile(data: UserProfileCompleteI): UserProfileI {
        let { roles, courses, proofs, email, name, phone, token, isRegistred, enrolled, id } = data

        // Default data obj
        let returnedData: UserProfileI = { email, name, phone, token, isRegistred, courses, enrolled, id }

        if (proofs) returnedData["proofs"] = proofs.map(({ value, status, proofBase64, createAt, id, token }) => ({ value, status, proofBase64, createAt: createAt.toISOString(), id, token }))
        if (roles) returnedData["roles"] = roles.map(r => r.roleName)

        return returnedData
    }
    response(data: object, metadata: object) {
        return { data, metadata }
    }

}