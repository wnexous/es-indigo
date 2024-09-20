import Heading from "@/components/Heading"
import Loading from "@/components/Loading"
import Text from "@/components/Text"
import SchoolDay from "@/components/schoolDay"
import { SchoolDaysI } from "@/interfaces/schemas.interface"
import { useProviders } from "@/providers"
import { Tooltip } from "primereact/tooltip"
import { v4 } from "uuid"

export default function VoucherClasses() {
    const { profile, session } = useProviders()
    const userProfile = profile.getProfile()
    const { schoolDays, proofs } = userProfile
    console.log('schoolDays', schoolDays)

    if (!proofs || !schoolDays) return <Loading />


    const sortShoolDays = (sd: SchoolDaysI[]) => sd.sort((a, b) => {
        const startClassA = new Date(a.startClass).getTime()
        const startClassB = new Date(b.startClass).getTime()

        return (startClassA - startClassB)
    })

    const getSchoolDaysByProofId = (id: string) => schoolDays.filter(s => s.proofsId == id)

    const schoolDaysSorted = sortShoolDays(schoolDays)
    return <>

        <div className="flex flex-col gap-2 text-[12px] sm:text-sm">
            <Heading as="h1">AGENDA</Heading>
            <p>Confira os dias e horários das suas aulas de dança agendadas e conheça os professores que vão acompanhá-lo em cada sessão.</p>
        </div>

        <div className="my-4 flex flex-col gap-4 whitespace-nowrap">

            {Object.values(proofs).map((p, i) => {
                const schoolDaysFromProf = getSchoolDaysByProofId(p.id!)
                const schoolDaysFromProfSorted = sortShoolDays(schoolDaysFromProf)
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
                    {Object.values(schoolDaysFromProfSorted).map((p, k) => <SchoolDay {...p} key={k} />)}
                </div>
            }
            )}
        </div>

        <p className="text-[10px] text-neutral-400">
            Deseja trocar de conta? <a className="underline text-[#9767fe]" href="/signout">clique aqui</a>
        </p>
    </>
}