import { User } from "@prisma/client"

export default class UserModel implements Partial<User> {
    createAt?: Date
    updateAt?: Date
    id?: string
    email = String()
    name = String()
    phone = String()
    token = String()
    isRegistred = Boolean()
}   