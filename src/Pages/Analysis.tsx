import { Tooltip } from "@mui/material"
import { Bell } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const Analysis = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex w-full  gap-4">
                <div className="flex flex-col m-2 w-[30%] gap-4">
                    <div className="landing_navbar sticky top-2 h-14 z-50">
                        <nav className="flex justify-between items-center p-4 w-full h-full bg-amber-400 rounded-2xl shadow-lg">
                            <div className="image">
                                <Link to={"/"} className="font-bold text-2xl text-blue-900">
                                    QuickAttend
                                </Link>
                            </div>
                            <div className="flex justify-between items-center w-24">
                                <Tooltip title="GraphView">
                                    <span
                                        className="text-blue-900 rounded-full flex items-center justify-center text-xl w-10 h-10 cursor-pointer"
                                        onClick={() => navigate("/admin")}
                                    >
                                        Home
                                    </span>
                                </Tooltip>
                                <Tooltip title="Notification">
                                    <span className="text-blue-900 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md">
                                        <Bell size={24} />
                                    </span>
                                </Tooltip>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analysis