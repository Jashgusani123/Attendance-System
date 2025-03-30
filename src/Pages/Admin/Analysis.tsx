import { Tooltip } from "@mui/material"
import { Bell } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import UserCard from "../../Components/Admin/UserCards";
import StudentRatio from "../../Components/Admin/StudentRatio";
import AttendanceChart from "../../Components/Admin/TotalAttedanceChart";
import { useEffect, useState } from "react";
import Notification from "../Notification";
import { useGetPresentAndAbsentCardsMutation } from "../../Redux/API/Admin";

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
const Analysis = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [PresentPersentag, setPresentPersentag] = useState(0);
    const [AbsentPersentag, setAbsentPersentag] = useState(0);
    // const [PresentPersentag, setPresentPersentag] = useState(0);
    // const [PresentPersentag, setPresentPersentag] = useState(0);
    const [PresentAndAbsentCard] = useGetPresentAndAbsentCardsMutation();
  const userId = location.state.id; 

    useEffect(()=>{
        const GetPersentAndAbsentCard = async()=>{
            const response = await PresentAndAbsentCard(userId);
            if(response && "data" in response && response.data?.success && response.data.PresentPersentage ){
                setPresentPersentag(response.data.PresentPersentage);
                setAbsentPersentag(100 - response.data.PresentPersentage )
            }
        }
        GetPersentAndAbsentCard();
        setNotifications(data);
      },[])

    return (
        <>
            <div className="flex w-full sm:flex-row flex-col px-4 gap-4">
                {/* NavBar and Circal Graph */}
                <div className="flex flex-col m-2 sm:w-[30%] w-full  gap-4">
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
                                    <span onClick={() => setShowNotifications(!showNotifications)} className="relative text-blue-900 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md">
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
                    <div className="studentRatio h-[505px] w-full bg-white shadow-lg rounded-2xl flex items-center justify-center">
                        <StudentRatio title="Present & Absent Overview (Till Now)" other={true}  userId={userId}/>
                    </div>
                </div>
                {/* Attendance Chart (Properly Positioned) */}
                <div className="flex flex-col sm:w-[70%] w-full mt-2 gap-4">
                    {/* Overview With Cards */}
                    <div className="right_Cards grid grid-cols-2 md:grid-cols-4 gap-4">
                        <UserCard count={Math.round(PresentPersentag)+"%"} type="Student Present In each Class(Last 7 Days)w" bgcolor="bg-[#C3EBFA]" />
                        <UserCard count={Math.round(AbsentPersentag)+"%"} type="Student Absent In each Class(Last 7 Days)" bgcolor="bg-amber-400" />
                        <UserCard count={"68%"} type="Teacher Take Class in last 7 days" bgcolor="bg-[#C3EBFA]" />
                        <UserCard count={"48%"} type="Teacher don't Take Class in last 7 days" bgcolor="bg-amber-400" />
                    </div>
                    {/* Attendance Chart (Properly Positioned) */}
                    <div className="bg-white shadow-lg rounded-2xl h-[400px] p-4">
                        <h2 className="text-lg font-semibold mb-4">Attendance Overview (Total Class)</h2>
                        <AttendanceChart isOther={true} userId={userId} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Analysis