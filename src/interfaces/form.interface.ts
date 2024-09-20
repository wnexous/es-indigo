import { ProofsI, SchoolDaysI } from "./schemas.interface"

export interface FormI {
    name: string,
    phone: string,
    checkbox: SchoolDaysI[]
    proof: ProofsI
}