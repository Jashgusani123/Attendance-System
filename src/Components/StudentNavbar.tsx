import { Link } from "react-router-dom"

const StudentNavbar = () => {
    return (
        <>
            <nav className="w-full h-15 flex justify-between items-center p-2 bg-amber-400" >
                <div className="logo w-full">
                    <Link to={"/"} className="font-bold text-2xl text-blue-900">QuickAttend</Link>
                </div>
                <div className="options w-full flex gap-8 justify-end items-center">
                    <Link to={"/"} className="text-blue-900 font-semibold">Home</Link>
                    {/* <Link to={"/setting"} >Setting</Link> */}
                </div>
                <div className="profile w-[20%] h-full flex justify-center">
                    <img src="https://ui-avatars.com/api/?name=J&background=random&color=fff&size=128" alt="" className="rounded-[30px]" />
                </div>
            </nav>
        </>
    )
}

export default StudentNavbar