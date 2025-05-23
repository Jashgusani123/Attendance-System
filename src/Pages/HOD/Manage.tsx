import { Avatar, Tooltip } from "@mui/material";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MiniChat from "../../Components/HOD/TeacherChat";
import TeacherTimeTable from "../../Components/HOD/TeacherTimeTable";
import Notification from "../Notification";
import { useGetTeacherInfoMutation } from "../../Redux/API/Hod";

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
interface TeacherInfo {
  fullName:string,
  departmentName:string,
  email:string,
  avatarName:string
  collegeJoiningData:string,
}
const Manage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.id; 
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [TeacherInfo, setTeacherInfo] = useState<TeacherInfo>()
  const [GetTeacherInfo] = useGetTeacherInfoMutation();

  useEffect(()=>{
    const funcGetTeachersInfo = async()=>{
      const response = await GetTeacherInfo(userId);
      if(response && "data" in response && response.data?.teacherInfo){
        setTeacherInfo(response.data?.teacherInfo)
      }else{
        console.log(response.error);
      }
    }
    funcGetTeachersInfo();
    setNotifications(data);
  },[])

  return (
    <>
      {/* Navbar with Teacher Information */}
      <div className="flex w-full flex-col sm:flex-row sm:p-0 p-4 gap-4">
        {/* Navbar */}
        <div className="flex flex-col ml-4 sm:w-[30%]  gap-4">
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
        </div>
        {/* Side Navbar with Teacher Information */}
        <div className="teacher_info  flex justify-start items-center mt-2 p-2 bg-[#C3EBFA] sm:w-[70%] h-14 ">
          <div className="avatar">
            <Avatar
              src={`https://ui-avatars.com/api/?name=${TeacherInfo?.avatarName}`}
              className="mr-4 w-16 h-16"
            />
          </div>
          <div className="info flex justify-between w-full ">
            <div className="names">
              <p className="text-xl font-bold">{TeacherInfo?.fullName}</p>
              <p className="text-[10px] font-medium">{TeacherInfo?.departmentName}</p>
            </div>
            <div className="joing flex justify-center flex-col items-end  " >
              <p className=" flex">{TeacherInfo?.collegeJoiningData}<svg xmlns="http://www.w3.org/2000/svg" className="bg-amber-300 rounded-full p-[3px]" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" /></svg></p>
              <p className="text-blue-900 flex gap-1 items-center">{TeacherInfo?.email}<svg xmlns="http://www.w3.org/2000/svg" className="bg-amber-300 rounded-full p-[3px]" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1E124A"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg></p>
            </div>
          </div>
        </div>
      </div>
      {/* Timetable and Chat */}
      <div className="info_of_manage flex w-full sm:flex-row flex-col justify-around items-center ">
        {/* Timetable */}
        <div className="timetable_container sm:w-[70%] w-[90%] ">
          <TeacherTimeTable />
        </div>
        {/* Chat */}
        <div className="functionality_container flex justify-between bg-amber-300 p-4 h-[450px] rounded-2xl flex-col gap-8 items-center sm:w-[28%]">
          <MiniChat userId={userId} />
        </div>
      </div>
      {/* Timetable Button*/}
      <div className="timeTable_Edite_btn flex mt-2 w-[30%]">
        <button className="bg-[#ffc800] ml-5 p-1 rounded-xl font-bold  text-xl flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg> TimeTable</button>
      </div>
    </>
  )
}

export default Manage