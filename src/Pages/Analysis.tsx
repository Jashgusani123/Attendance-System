import { Tooltip } from "@mui/material"
import { Bell } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import UserCard from "../Components/Admin/UserCards";
import StudentRatio from "../Components/Admin/StudentRatio";
import AttendanceChart from "../Components/Admin/TotalAttedanceChart";

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
                    <div className="studentRatio h-[350px] w-full bg-white shadow-lg rounded-2xl flex items-center justify-center">
                        <StudentRatio title="Present & Absent in Last 7 Days" other={true} />
                    </div>
                </div>

                <div className="flex flex-col w-[70%] mt-2 gap-4">

                    <div className="right_Cards grid grid-cols-2 md:grid-cols-4 gap-4">
                        <UserCard count={"58%"} type="Student Present In each Class" bgcolor="bg-[#C3EBFA]" />
                        <UserCard count={"58%"} type="Student Absent In each Class" bgcolor="bg-amber-400" />
                        <UserCard count={"68%"} type="Teacher Take Class in last 7 days" bgcolor="bg-[#C3EBFA]" />
                        <UserCard count={"48%"} type="Teacher don't Take Class in last 7 days" bgcolor="bg-amber-400" />
                    </div>
                    {/* Attendance Chart (Properly Positioned) */}
                <div className="bg-white shadow-lg rounded-2xl p-4">
                    <h2 className="text-lg font-semibold mb-4">Attendance Overview (Total Class)</h2>
                    <AttendanceChart isOther={true} />
                </div>
                </div>
                
            </div>
        </>
    )
}

export default Analysis