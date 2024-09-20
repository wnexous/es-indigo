
import { ApiBackendParams } from '@/interfaces/api.backend.interface';
import apiBackend from '@/vendors/api-backend';
import { type NextRequest } from 'next/server';


interface Params {
    proofId: string
}

const POST = async (req: NextRequest, { params }: ApiBackendParams<Params>) => {
    try {
        const { proofId } = params
        const metadata = {}

        const databaseResponse = await apiBackend.database.getProof({ proofId })
        const parsedData = apiBackend.data.response(databaseResponse, metadata)
        return Response.json(parsedData)
    } catch (error: any) {
        return apiBackend.auth.error({ message: error?.message, status: 404 })
    }
}

export default POST