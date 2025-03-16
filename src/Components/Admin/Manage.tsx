import { Avatar, Tooltip } from "@mui/material";
import { Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TeacherTimeTable from "./TeacherTimeTable";

const Manage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="flex flex-col w-[25%] h-full bg-gray-100 p-4 shadow-lg">
        <nav className="sticky top-2 h-full bg-amber-400 rounded-2xl shadow-lg p-4 flex flex-col justify-between">
          <Link to="/" className="font-bold text-2xl text-blue-900">
            QuickAttend
          </Link>
          <div className="flex justify-between items-center">
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

      {/* Main Content */}
      <div className="flex flex-col flex-grow h-full overflow-hidden bg-gray-50 p-4">
        {/* Teacher Info */}
        <div className="flex items-center bg-[#C3EBFA] p-4 rounded-lg shadow-md">
          <Avatar src="https://ui-avatars.com/api/?name=JG" className="w-16 h-16 mr-4" />
          <div className="flex justify-between w-full">
            <div>
              <p className="text-xl font-semibold">Jash Gusani</p>
              <p className="text-sm text-gray-600">Computer</p>
            </div>
            <div className="text-right">
              <p>12/3/2035</p>
              <p>jashgusanii1@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Teacher Timetable */}
        <div className="flex-grow overflow-hidden mt-4">
          <TeacherTimeTable />
        </div>
      </div>
    </div>
  );
};

export default Manage;
