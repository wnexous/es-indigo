import { getCoursesByUserId } from "@/backend/courses"
import Courses from "@/components/Courses"
import Heading from "@/components/Heading"
import Loading from "@/components/Loading"
import Text from "@/components/Text"
import CoursesModel from "@/models/courses.model"
import { useProviders } from "@/providers"
import { courses } from "@prisma/client"
import { Tooltip } from "primereact/tooltip"
import { useEffect, useState } from "react"
import { v4 } from "uuid"

export default function VoucherClasses() {
    const { profile, session } = useProviders()
    const userProfile = profile.getProfile()

    const [courses, setCourses] = useState<courses[]>([])
    const { proofs, enrolled } = userProfile

    useEffect(() => {
        getCoursesByUserId(userProfile.id!)
            .then(setCourses)
    }, [])


    if (!proofs || !courses || !enrolled) return <Loading />

    const sortCourses = (sd: CoursesModel[]) => sd.sort((a, b) => {
        const startClassA = new Date(a.startClass).getTime()
        const startClassB = new Date(b.startClass).getTime()

        return (startClassA - startClassB)
    })

    const getCourseByProofId = (proofId: string) => enrolled
        .filter(s => s.proofId == proofId)
        .map(enroll => courses.find(course => course.id == enroll.courseId))

    return <>

        <div className="flex flex-col gap-2 text-[12px] sm:text-sm">
            <Heading as="h1">AGENDA</Heading>
            <p>Confira os dias e horários das suas aulas de dança agendadas e conheça os professores que vão acompanhá-lo em cada sessão.</p>
        </div>

        <div className="my-4 flex flex-col gap-4 whitespace-nowrap">

            {Object.values(proofs).map((p, i) => {
                const coursesFromProf = getCourseByProofId(p.id!)
                console.log('coursesFromProf', coursesFromProf)
                const rowUUID = v4()
                return <div key={i} className="flex flex-col gap-2">
                    <div className="bg-[#ffffff35] px-2 rounded-md">
                        <Text className="flex justify-between whitespace-nowrap gap-2" data-uuid={rowUUID}>
                            <span>Token da aula</span> <span className="font-bold text-ellipsis overflow-hidden">{p.token}</span>
                        </Text>
                        <Tooltip target={`[data-uuid="${rowUUID}"]`} position="bottom" mouseTrack mouseTrackTop={10} >
                            Token: {p.token}
                        </Tooltip>
                    </div>
                    {coursesFromProf.map((p, k) => p && <Courses {...p} key={k} />)}
                </div>
            }
            )}
        </div>

        <p className="text-[10px] text-neutral-400">
            Deseja trocar de conta? <a className="underline text-[#9767fe]" href="/signout">clique aqui</a>
        </p>
    </>
}