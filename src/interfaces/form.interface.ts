import { ProofsI, SchoolDaysI } from "./schemas.interface"

export interface FormI {
    name: string,
    phone: string,
    courses: { id: string }[]
    proof: ProofsI
}