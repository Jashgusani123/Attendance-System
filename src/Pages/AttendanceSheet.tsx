import { Link, useLocation } from "react-router-dom"

const AttendanceSheet = () => {
    const location = useLocation();
    const Subject = location.state?.sub;
    // console.log(subhg)
    
    return (
        <>
            <div className="header bg-blue-800 p-2 flex items-center flex-wrap justify-around">
                <div className="left">
                    <Link to={"/"} className="font-bold text-4xl text-amber-500">QuickAttend</Link>
                </div>
                <div className="right flex flex-col">
                    <div className="top flex justify-end">
                        <p className="font-bold text-2xl text-white ">AttendanceSheet</p>
                    </div>
                    <div className="bottom flex gap-4 justify-end">
                        <p className="text-zinc-400">Computer</p>
                        <p className="text-zinc-400">Semester - 4</p>
                        <p className="text-zinc-400">{Subject}</p>
                    </div>
                </div>
            </div>
            <section className="m-2 flex gap-4 flex-col">
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
            </section>
        </>
    )
}

const Student = () => {
    return (
        <>
            <div className="box flex justify-between items-center p-4 bg-amber-400 rounded-lg">
                <div className="left flex justify-around items-center gap-2">
                    <div className="er_number border-r-2 border-zinc-900 p-2">1</div>
                    <div className="name">Jash Gusani</div>
                </div>
                <div className="right flex justify-between gap-2">
                    <button className="text-green-600 font-bold border-2 border-green-500 p-2 rounded-md hover:bg-green-600 hover:text-white">Present</button>
                    <button className="text-red-700 font-bold border-2 border-red-600 p-2 rounded-md hover:bg-red-700 hover:text-white">Absent</button>
                </div>
            </div>
        </>
    )
}

export default AttendanceSheet