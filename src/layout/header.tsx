import Icons from "@/assets/Icons";

export default function Header() {
    return <header className="gradient flex items-center ">
        <div className="container-xs h-16 flex items-center">
            <a href="/" className=" w-[100px] h-fit"><Icons.Logo className='max-w-[100px]' fill="#110f1c" /></a>
        </div>
    </header>

}