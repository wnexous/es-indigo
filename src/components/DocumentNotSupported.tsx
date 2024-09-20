import { Button } from "primereact/button";
import { BiDownload } from "react-icons/bi";

export default ({ fileExtension, onRequestDownload }: { fileExtension: string, onRequestDownload: VoidFunction }) => <div className="h-full p-8 w-full flex flex-col items-center justify-around bg-[#3f3b55] rounded-md">
    <div className="flex flex-col my-auto">
        <span className="text-2xl font-bold">Infelizmente, o tipo de arquivo <span className="font-bold text-purple-500">"{fileExtension}"</span> não é suportado para visualiação. 🥺</span>
        <span className="opacity-50">
            Clique no botão abaixo para baixar.
        </span>
    </div>
    <Button onClick={onRequestDownload} className="gradient-2 p-4 w-full flex justify-center font-bold gap-2 hover:opacity-75 transition-all mt-auto">Baixar <BiDownload /></Button>

</div>