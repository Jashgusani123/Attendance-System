import { Tooltip } from "@mui/material";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudentRatio from "../../Components/HOD/StudentRatio";
import AttendanceChart from "../../Components/HOD/TotalAttedanceChart";
import UserCard from "../../Components/HOD/UserCards";
import { useGetAllCardsMutation } from "../../Redux/API/Hod";
import Notification from "../Notification";

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
interface Counts {
    AllAdminCount:string , AllStudentCount:string , AllTeacherCount:string}
const ViewPage = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [Counts, setCounts] = useState<Counts>();
    const [GetAllCards] = useGetAllCardsMutation();

    useEffect(()=>{
        const GetAllCardInfo = async()=>{
            const response = await GetAllCards(null);
            if(response && "data" in response && response.data?.success && response.data?.CardsData){
                setCounts(response.data.CardsData)
            }else{
                console.log(response.error);
            }
        }
        
        GetAllCardInfo();
        setNotifications(data);
      },[])

    return (
        <div className="flex w-full flex-col sm:flex-row h-screen px-4 gap-4">
            {/* Left Sidebar (Navbar + StudentRatio) */}
            <div className="flex flex-col flex-wrap  sm:w-[30%] w-full gap-4">
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
                                    onClick={() => navigate("/hod")}
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
                <div className="studentRatio h-[510px] w-full bg-white shadow-lg rounded-2xl flex items-center justify-center">
                    <StudentRatio />
                </div>
            </div>

            {/* Right Section - Cards + Attendance Chart */}
            <div className="flex flex-col sm:w-[70%] mt-2 gap-4">
                {/* Cards with Overview */}
                <div className="right_Cards grid grid-cols-2 md:grid-cols-3 gap-4">
                    <UserCard type="student" count={Counts?.AllStudentCount!} bgcolor="bg-[#C3EBFA]" />
                    <UserCard type="teacher" count={Counts?.AllTeacherCount!}    bgcolor="bg-amber-400" />
                    <UserCard type="admin" count={Counts?.AllAdminCount!} bgcolor="bg-[#C3EBFA]" />
                </div>

                {/* Attendance Chart (Properly Positioned) */}
                <div className="bg-white shadow-lg rounded-2xl h-[419px] p-4">
                    <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
                    <AttendanceChart />
                </div>
            </div>
        </div>
    );
};

export default ViewPage;
