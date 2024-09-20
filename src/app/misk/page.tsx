'use client'

import { MouseEventHandler, useState } from "react"

const pwd = 'misk_a_rainha_do_nexinho'

export default function Sim() {
    const [posit, setPosit] = useState<{ width: number | undefined, height: number | undefined }>({ width: undefined, height: undefined })

    const [hasLogged, setHasLogged] = useState(false)
    const [inputPass, setInputPass] = useState("")

    const h: MouseEventHandler<HTMLButtonElement> = (e) => {
        setPosit({
            height: Math.random() * window.innerHeight,
            width: Math.random() * window.innerWidth,
        })

    }

    const n = () => {
        alert("A misk eh a rainha mais linda desse planeta <3")
    }

    const s = () => {
        alert("Ihhaaa, vamo maratonar filmes de terror com chocolates e pipoca :b")
    }
    const handlerLogin = () => {
        if (inputPass == pwd) setHasLogged(true)
    }


    if (!hasLogged) return (<main className="min-h-screen flex items-center justify-center">
        <div className="bg-white max-w-96 w-full rounded-md text-black flex flex-col items-center gap-4 p-4">
            <h1 className="text-lg font-bold w-full">SENHA</h1>
            <input value={inputPass} onChange={v => setInputPass(v.target.value)} type="text" className="border-2 w-full rounded-md p-2" />
            <button onClick={handlerLogin} className="p-2 bg-blue-500 rounded-md w-full text-white font-bold">Entrar</button>
        </div>

    </main>)

    return <main className="min-h-screen">
        <p className="my-8 text-center font-owners text-2xl">
            A Misk (linda princesa) deseja assistir alguma coisinha com Nexinho?
        </p>
        <button className="bg-green-700 p-8 animate-bounce" onClick={s}>
            SIM :b
        </button>
        <button className="bg-red-700 p-8 absolute transition-all duration-200" onClick={n} onMouseEnter={h} style={{ left: posit.width, top: posit.height }}>
            NAO :(
        </button>

    </main>
}