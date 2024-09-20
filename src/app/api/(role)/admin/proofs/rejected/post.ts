
import apiBackend from '@/vendors/api-backend'
import { type NextRequest } from 'next/server'
const POST = async (req: NextRequest) => {

    try {
        const metadata = { pageIndex: 0, pageSize: 10000 }
        const databaseResponse = await apiBackend.database.getRejectedProofs(metadata)
        const parsedData = apiBackend.data.response(databaseResponse, metadata)
        return Response.json(parsedData)
    } catch (error: any) {
        return apiBackend.auth.error({ message: error, status: 404 })
    }
}

export default POST