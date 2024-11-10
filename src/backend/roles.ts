"use server"

import database from "@/lib/database"



export async function getUserByRole(role: string) {
    return await database.user.findMany({
        where: {
            roles: { some: { roleName: role } }
        }
    })
}

export async function getAllTeachers() {
    return await getUserByRole("teacher")
}

export async function getAllUsers() {
    return await getUserByRole("user")
}



export async function getAllAdmins() {
    return await getUserByRole("admin")
}
