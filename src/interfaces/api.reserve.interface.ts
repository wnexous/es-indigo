import ClassScheduleI from "./classSchedule.interface"
import { ProofsDBI } from "./schemas.interface"

export interface ApiReserveI {
    username: string
    phone: string
    classSchedules: ClassScheduleI[]
    proof: ProofsDBI
}