"use server"

import { UserProfileI } from "@/interfaces/UserProfile.interface";
import database from "@/lib/database";
import enrollSchema from "@/schemas/enroll.schema";
import apiBackend from "@/vendors/api-backend";
import { Session } from "next-auth";
import updateUserByEmail from "./users";

export async function enroll(data: typeof enrollSchema._type): Promise<UserProfileI & { error?: boolean, issues?: { message: string, path?: string[] }[] }> {
    try {
        data = enrollSchema.parse(data)

        const session = await apiBackend.auth.getUserSession() as Session
        const email = session.user?.email
        if (!email) throw Error("user session not found")

        const user = await updateUserByEmail(email, { phone: data.phone })

        const proof = await database.proofs.create({
            data: {
                proofBase64: data.proof.proofBase64,
                value: data.proof.value,
                userId: user.id,
            }
        })

        const databaseData = data.courses.map(({ id: courseId }) => {
            return ({
                userId: user.id,
                courseId: courseId,
                proofId: proof.id
            })
        })

        await database.enrolled.createMany({
            data: databaseData
        })

        return apiBackend.data.parseUserProfile(await updateUserByEmail(email, { phone: data.phone, isRegistred: true }))
    } catch (error: any) {
        return { error: true, issues: error.issues } as any
    }
}