import { SchoolDaysI } from "@/interfaces/schemas.interface"

export interface ClassCoursesI extends SchoolDaysI {
    id: string
}

const createSchoolDay = (props: ClassCoursesI) => (props)

export default {
    erick: createSchoolDay({
        startClass: new Date(2024, 8, 14, 13, 0),
        endClass: new Date(2024, 8, 14, 14, 10),
        id: "erick",
        teacherName: "Erick"
    }),
    max: createSchoolDay({
        startClass: new Date(2024, 8, 14, 14, 20),
        endClass: new Date(2024, 8, 14, 15, 30),
        id: "max",
        teacherName: "Max"
    }),
    kaih: createSchoolDay({
        startClass: new Date(2024, 8, 14, 15, 40),
        endClass: new Date(2024, 8, 14, 16, 50),
        id: "kaih",
        teacherName: "Kaih"
    }),
    clau: createSchoolDay({
        startClass: new Date(2024, 8, 14, 17, 0),
        endClass: new Date(2024, 8, 14, 18, 10),
        id: "clau",
        teacherName: "Clau"
    }),
    gabe: createSchoolDay({
        startClass: new Date(2024, 8, 15, 11, 20),
        endClass: new Date(2024, 8, 15, 12, 30),
        id: "gabe",
        teacherName: "Gabe"
    }),
    gaby: createSchoolDay({
        startClass: new Date(2024, 8, 15, 13, 0),
        endClass: new Date(2024, 8, 15, 14, 10),
        id: "gaby",
        teacherName: "Gaby"
    }),
    ally: createSchoolDay({
        startClass: new Date(2024, 8, 15, 14, 20),
        endClass: new Date(2024, 8, 15, 15, 30),
        id: "ally",
        teacherName: "Ally"
    }),
    jhow: createSchoolDay({
        startClass: new Date(2024, 8, 15, 15, 40),
        endClass: new Date(2024, 8, 15, 16, 50),
        id: "jhow",
        teacherName: "Jhow"
    }),
    italo: createSchoolDay({
        startClass: new Date(2024, 8, 15, 17, 40),
        endClass: new Date(2024, 8, 15, 18, 10),
        id: "italo",
        teacherName: "Italo"
    }),

}