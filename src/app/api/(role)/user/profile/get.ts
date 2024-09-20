import apiBackend from '@/vendors/api-backend'
import { Session } from 'next-auth'
import { type NextRequest } from 'next/server'
export default async function GET(request: NextRequest) {
    const session = await apiBackend.auth.getUserSession() as Session
    const email = session.user?.email
    if (!email) return apiBackend.auth.error({ message: "invalid email", status: 401 })

    try {
        const databaseResponse = await apiBackend.database.getUserByEmail({ email, include: { roles: true, schoolDays: true, proofs: true } })
        return Response.json(apiBackend.data.parseUserProfile(databaseResponse))
    } catch (error: any) {
        console.log('error', error)
        return apiBackend.auth.error({ message: "user not registred", status: 404 })
    }
}