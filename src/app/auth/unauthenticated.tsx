
export default function UnauthenticatedPage() {
    return <div className="h-full items-center flex justify-center my-auto self-center justify-self-center flex-grow py-64">
        <div className="flex flex-col gap-4">
            <span className="flex flex-col gap-2">
                <h1 className="text-3xl">
                    Usuário não autenticado 🥺
                </h1>
                <p className="text-sm">
                    Retorne à página principal clicando no botão abaixo
                </p>
            </span>
            <div className="flex gap-2 flex-wrap">
                <a href={"/"} className="flex-grow text-center p-2 gradient-2 rounded-md text-black font-bold">
                    Voltar à página principal
                </a>
            </div>
        </div>
    </div>
}