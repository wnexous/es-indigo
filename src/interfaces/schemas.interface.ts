import ProofStatus from "@/config/ proofStatus";
import { User, proofs, roles, schoolDays } from "@prisma/client";


export type UserI = { name: string, email: string, phone: string, createAt?: string, updateAt?: string, isRegistred?: boolean, id: string }
export type UserDBI = Partial<User> & UserI

export type SchoolDaysI = { teacherName: string, startClass: Date | string, endClass: Date | string, createAt?: string, updateAt?: string, proofsId?: string }
export type SchoolDaysDBI = Partial<schoolDays> & SchoolDaysI

export type ProofsI = { value: number, proofBase64: string, status?: keyof typeof ProofStatus | string, createAt?: string, updateAt?: string, id?: string, token?: string }
export type ProofsDBI = Partial<proofs> & ProofsI

export type RolesI = { roleName: string }
export type RoleI = string
export type RolesDBI = Partial<roles> & RolesI