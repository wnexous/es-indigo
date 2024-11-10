"use server"

import homeFormSchema from "@/schemas/homeform.schema"


export async function registerUserData(data: typeof homeFormSchema._type) {

    const bodyDataParsed = homeFormSchema.parse(data)

}