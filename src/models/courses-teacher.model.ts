import { courses } from "@prisma/client"
import UserModel from "./User.model"

export default class CoursesTeacherModel implements Partial<courses> {

    courseName = String()
    endClass = new Date()
    startClass = new Date()
    teacherId = String()
    price = Number()
    id?: string
    teacher: UserModel = new UserModel()
}   