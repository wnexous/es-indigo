import { ProofsI, RoleI, SchoolDaysI, UserI } from "./schemas.interface"

export interface UserProfileI extends UserI {
    "token": string
    "roles"?: RoleI[],
    "schoolDays"?: SchoolDaysI[],
    "proofs"?: ProofsI[]
}