import { FormI } from '@/interfaces/form.interface'
import { ProofsI, SchoolDaysI, UserI } from '@/interfaces/schemas.interface'
import apiBackend from '@/vendors/api-backend'
import calculateClassesValue from '@/vendors/calculateClassesValue'
import { Session } from 'next-auth'
import { type NextRequest } from 'next/server'
import homeFormSchema from '../../../../../schemas/homeform.schema'
export default async function POST(request: NextRequest) {

    const session = await apiBackend.auth.getUserSession() as Session
    const email = session.user?.email
    if (!email) return apiBackend.auth.error({ message: "invalid email", status: 400 })

    const bodyData = await apiBackend.data.getBodyData<FormI>(request)

    try {
        const bodyDataParsed = homeFormSchema.parse(bodyData)


        const User: UserI = { email, name: bodyDataParsed.name, phone: bodyDataParsed.phone }
        const schoolDays: SchoolDaysI[] = bodyDataParsed.checkbox

        // calculamos o valor no backend
        const value = calculateClassesValue(schoolDays.length)
        const proofs: ProofsI = { ...bodyDataParsed.proof, value }

        try {
            const databaseResponse = await apiBackend.database.updateUserProofClassesByUserEmail({ User, schoolDays, proofs })
            return Response.json(apiBackend.data.parseUserProfile(databaseResponse))
        } catch (error: any) {
            console.log('error', error)
            return apiBackend.auth.error({ message: "user already registered", status: 409 })
        }
    } catch (error: any) {
        return Response.json({ error: true, issues: error.issues }, { status: 400 })
    }
}