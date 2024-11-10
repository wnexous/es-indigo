import { User, courses, enrolled, proofs, roles } from "@prisma/client";

export interface UserProfileCompleteI extends User {
    courses?: courses[],
    enrolled?: enrolled[],
    proofs?: proofs[],
    roles?: roles[]
}