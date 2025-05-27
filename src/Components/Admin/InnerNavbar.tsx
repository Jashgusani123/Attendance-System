
const InnerNavbar = ({Components , Name}:{Components?:any , Name:string}) => {
    return (
        <nav className="bg-zinc-300 rounded-[10px] sticky top-2 z-40 w-full flex justify-between items-center px-4 py-3 mb-4">
            <h1 className="text-2xl font-bold text-zinc-800">{Name}</h1>
            {Components}
        </nav>
    )
}

export default InnerNavbar