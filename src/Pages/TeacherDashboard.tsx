import { Avatar, Button, Card } from "@mui/material";
import { Bell, Calendar, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const attendanceGraphData = [
  { date: "Mon", totalStudents: 70, studentsAttended: 60 },
  { date: "Tue", totalStudents: 70, studentsAttended: 50 },
  { date: "Wed", totalStudents: 70, studentsAttended: 65 },
  { date: "Thu", totalStudents: 70, studentsAttended: 68 },
  { date: "Fri", totalStudents: 70, studentsAttended: 63 },
  { date: "Sat", totalStudents: 70, studentsAttended: 62 },
  { date: "Sun", totalStudents: 70, studentsAttended: 55 },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const attendancesheet = ({ sub }: { sub: string }) => {
    console.log(sub);
    navigate("/attendance", { state: { sub } });
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8eee3] p-6 text-white font-sans">
        {/* Logo */}
        <div className="logo_with_dashboard rounded-bl-2xl rounded-br-2xl bg-[#c0bfbf] w-fit p-2">
          <p className="font-bold text-2xl text-blue-900">QuickAttend</p>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-amber-400 p-4 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-blue-900">Teacher Dashboard</h1>
          <Bell className="text-blue-900 w-6 h-6 cursor-pointer" />
        </div>

        {/* Profile Section */}
        <Card className="bg-blue-900 text-white p-6 rounded-2xl flex items-center shadow-lg">
          <Avatar
            src="https://ui-avatars.com/api/?name=Teacher+Name"
            className="mr-4 w-16 h-16"
          />
          <div>
            <h2 className="text-xl font-semibold">Teacher Name</h2>
            <p className="text-sm text-gray-300">Subject: Mathematics</p>
          </div>
        </Card>

        {/* Dashboard Content */}
        <div className="main_Container flex flex-wrap justify-between lg:flex-col gap-6 mt-6">
          {/* Student Attendance Overview */}
          <div className="w-[100%] lg:w-full">
            <Card className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-bold mb-4 bg-amber-400 rounded-2xl w-fit p-2">
                Student Attendance Overview
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={attendanceGraphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
                  <XAxis dataKey="date" stroke="#1e3a8a" />
                  <YAxis stroke="#1e3a8a" />
                  <Tooltip contentStyle={{ backgroundColor: "#f8eee3", color: "black" }} />
                  <Line type="monotone" dataKey="totalStudents" stroke="#FF6347" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="studentsAttended" stroke="#1e3a8a" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Upcoming Classes */}
          <div className="w-[100%] lg:w-full">
            <Card className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-bold mb-4 flex items-center bg-amber-400 p-2 rounded-2xl w-fit">
                <Calendar className="mr-2" /> Upcoming Classes
              </h2>
              <ul className="space-y-3">
                <li
                  className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md"
                  onClick={() => attendancesheet({ sub: "WebDevelopment" })}
                >
                  <div>
                    <p className="text-base font-medium text-white">Web Development</p>
                    <p className="text-sm text-gray-400">9:00 AM</p>
                  </div>
                  <p className="text-sm font-semibold text-blue-500 cursor-pointer">View Details</p>
                </li>
                <li
                  className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md"
                  onClick={() => attendancesheet({ sub: "Java" })}
                >
                  <div>
                    <p className="text-base font-medium text-white">Java</p>
                    <p className="text-sm text-gray-400">10:00 AM</p>
                  </div>
                  <p className="text-sm font-semibold text-blue-500 cursor-pointer">View Details</p>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-between gap-4 mt-6">
          <Button variant="contained" color="secondary" startIcon={<FileText />}>
            Generate Report
          </Button>
        </div>
      </div>
    </>
  );
}
