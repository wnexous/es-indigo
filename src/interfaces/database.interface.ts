import { User, proofs, roles, schoolDays } from "@prisma/client";

export interface UserProfileCompleteI extends User {
    schoolDays?: schoolDays[],
    proofs?: proofs[],
    roles?: roles[]
}