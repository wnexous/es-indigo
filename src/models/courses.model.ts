import { courses } from "@prisma/client"

export default class CoursesModel implements Partial<courses> {

    courseName = String()
    endClass = new Date()
    startClass = new Date()
    teacherId = String()
    price = Number()
    id?: string
}   