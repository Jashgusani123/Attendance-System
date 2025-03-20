import { Tooltip } from "@mui/material";
import { Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StudentRatio from "../Components/Admin/StudentRatio";
import UserCard from "../Components/Admin/UserCards";
import AttendanceChart from "../Components/Admin/TotalAttedanceChart";
import { useEffect, useState } from "react";
import Notification from "./Notification";

interface NotificationType {
    _id: string;
    upperHeadding: string;
    description: string;
}
const data = [
    {_id:"1",
      upperHeadding:"Hello",
      description:"Hii"
    }
  ]

const ViewPage = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(()=>{
        setNotifications(data);
      },[])

    return (
        <div className="flex w-full h-screen px-4 gap-4">
            {/* Left Sidebar (Navbar + StudentRatio) */}
            <div className="flex flex-col w-[30%] gap-4">
                {/* Navbar */}
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
                            <span onClick={() => setShowNotifications(!showNotifications)} className="text-blue-900 relative rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md">
                                <Tooltip title="Notification">
                                    <Bell size={24} />
                                </Tooltip>
                                {notifications.length > 0 && (
                                    <span className="absolute top-[-8px] right-[0px] bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                        {notifications.length}
                                    </span>
                                )}
                                {showNotifications && (
                                    <div className="absolute top-[0px]  right-[-40px] z-50 bg-white shadow-lg rounded-lg">
                                        <Notification fun={setShowNotifications} notifications={notifications} />
                                    </div>
                                )}
                            </span>
                        </div>
                    </nav>
                </div>

                {/* Student Ratio - Below Navbar */}
                <div className="studentRatio h-[350px] w-full bg-white shadow-lg rounded-2xl flex items-center justify-center">
                    <StudentRatio />
                </div>
            </div>

            {/* Right Section - Cards + Attendance Chart */}
            <div className="flex flex-col w-[70%] mt-2 gap-4">
                {/* Cards with Overview */}
                <div className="right_Cards grid grid-cols-2 md:grid-cols-4 gap-4">
                    <UserCard type="student" count={23} bgcolor="bg-[#C3EBFA]" />
                    <UserCard type="admin" count={1} bgcolor="bg-amber-400" />
                    <UserCard type="teacher" count={33} bgcolor="bg-[#C3EBFA]" />
                    <UserCard type="parent" count={21} bgcolor="bg-amber-400" />
                </div>

                {/* Attendance Chart (Properly Positioned) */}
                <div className="bg-white shadow-lg rounded-2xl p-4">
                    <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
                    <AttendanceChart />
                </div>
            </div>
        </div>
    );
};

export default ViewPage;
