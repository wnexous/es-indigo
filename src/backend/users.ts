"use server"

import database from "@/lib/database"
import { User } from "@prisma/client"

export default async function updateUserByEmail(email: string, data: Partial<User>) {

    return database.user.update({
        where: {
            email
        },
        data,
        include: {
            courses: true,
            enrolled: true,

        }
    })
}

export async function getAllUsers() {
    return database.user.findMany({
        include: {
            roles: true,
        }
    })

}


export async function changeUserRole(userId: string, roles: string[]) {
    await database.roles.deleteMany({
        where: {
            userId
        }
    })

    return await database.roles.createMany({
        data: roles.map(roleName => ({ roleName, userId }))
    })
}
