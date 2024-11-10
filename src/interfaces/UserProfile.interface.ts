import { courses, enrolled } from "@prisma/client"
import { ProofsI, RoleI, UserI } from "./schemas.interface"

export interface UserProfileI extends UserI {
    "token": string
    "roles"?: RoleI[],
    "courses"?: courses[],
    "proofs"?: ProofsI[]
    "enrolled"?: enrolled[]
}