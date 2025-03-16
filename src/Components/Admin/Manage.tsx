import { Avatar, Button, Tooltip } from "@mui/material"
import { Bell } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import TeacherTimeTable from "./TeacherTimeTable";
import MiniChat from "./TeacherChat";

const Manage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full  gap-4">
        <div className="flex flex-col ml-4 w-[30%] gap-4">
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
        <div className="teacher_info  flex justify-start items-center mt-2 p-2 bg-[#C3EBFA] w-full h-14 ">
          <div className="avatar">
            <Avatar
              src={`https://ui-avatars.com/api/?name=JG`}
              className="mr-4 w-16 h-16"
            />
          </div>
          <div className="info flex justify-between w-full ">
            <div className="names">
              <p className="text-xl">Jash Gusani</p>
              <p className="text-[10px]">Computer</p>
            </div>
            <div className="joing flex justify-center flex-col items-end" >
              <p>12/3/2035</p>
              <p>jashgusanii1@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="info_of_manage flex justify-around items-center ">
      <div className="timetable_container w-[70%]">
        <TeacherTimeTable />
      </div>
      <div className="functionality_container flex justify-between flex-col items-center w-[30%]">
        <Button>Edit TimeTable</Button>
        <MiniChat />
      </div>
      </div>
      
    </>
  )
}

export default Manage