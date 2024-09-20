import Icons from "@/assets/Icons"
import { Divider } from "primereact/divider"
import { PropsWithChildren } from "react"

export default   function IndigoTemplate({ children }: PropsWithChildren) {

    return <main className="flex items-stretch md:flex-row flex-col md:min-h-dvh">
        <div className="gradient min-h-[460px] md:w-[45%] flex items-center lg:px-20 md:px-12 px-12 justify-center lg:justify-end">
            <div className="flex flex-col gap-0 items-center text-[#110f1c] animate-fadeIn md:fixed top-0 bottom-0 my-auto h-fit">
                <Icons.Logo className='lg:w-[136px] w-[100px]' fill="#110f1c" />
                <div className="flex flex-col items-start">
                    <span className="lg:text-[47px] text-[38px] font-owners font-extrabold ">MUDANÇA</span>
                    <span className="lg:text-[348px] text-[280px] block lg:leading-[242px] leading-[200px] font-medium font-boba">ARTE</span>
                    <span className="lg:text-[47px] text-[38px] font-extrabold font-owners">INDIVÍDUO</span>
                </div>
            </div>
        </div>
        <div className="bg-[#110f1c] font-gotham font-semibold justify-center lg:justify-start md:w-[55%] flex pt-16 pb-8 md:pt-20 lg:px-24 md:px-12 px-16">
            {children}
        </div>
    </main>
}
