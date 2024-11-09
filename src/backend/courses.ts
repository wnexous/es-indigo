"use server"

import database from "@/lib/database";
import CoursesModel from "@/models/courses.model";

export async function createCourse(data: CoursesModel) {
    return await database.courses.create({ data })
}
export async function editCourse(id: string, data: CoursesModel) {
    return await database.courses.update({ data, where: { id } })
}
export async function deleteCourse(id: string) {
    return await database.courses.delete({ where: { id } })
}
export async function getAllCourses() {
    return await database.courses.findMany()
}
export async function getAllCoursesWithTeacher() {
    return await database.courses.findMany({
        include: { teacher: true }
    })
}

export async function getCourse(id: string) {
    return await database.courses.findFirst({ where: { id } })
}
