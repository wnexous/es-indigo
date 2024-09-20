import { ProofsDBI } from '@/interfaces/schemas.interface'
import apiBackend from '@/vendors/api-backend'
import { type NextRequest } from 'next/server'


export interface ProofsChangeData {
    id: string
    data: Partial<ProofsDBI>
}

export default async function PUT(request: NextRequest) {

    const { data, id } = await apiBackend.data.getBodyData<ProofsChangeData>(request)

    try {
        const databaseResponse = await apiBackend.database.changeProof({ data, id })
        const metadata = {}
        const parsedData = apiBackend.data.response(databaseResponse, metadata)
        return Response.json(parsedData)
    } catch (error: any) {
        return apiBackend.auth.error({ message: error, status: 404 })
    }
}