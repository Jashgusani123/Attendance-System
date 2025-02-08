import { Avatar, Card } from "@mui/material";
import { Bell, Calendar, CheckCircle, LogOut } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample data with the total number of lectures and the attended lectures
const data = [
  { date: "Mon", totalClasses: 7, yourAttendance: 7 },
  { date: "Tue", totalClasses: 7, yourAttendance: 5 },
  { date: "Wed", totalClasses: 7, yourAttendance: 6 },
  { date: "Thu", totalClasses: 7, yourAttendance: 7 },
  { date: "Fri", totalClasses: 7, yourAttendance: 6 },
  { date: "Sat", totalClasses: 7, yourAttendance: 4 },
  { date: "Sun", totalClasses: 7, yourAttendance: 0 },
];

// Classes for the day (Example)
const classes = [
  { subject: "Math", time: "9:00 AM", status: "Present" },
  { subject: "Physics", time: "11:00 AM", status: "Present" },
  { subject: "Chemistry", time: "2:00 PM", status: "Absent" },
];
type AttendanceData = {
  date: string;
  totalClasses: number;
  yourAttendance: number;
}
// Calculate attendance percentage
const calculateAttendancePercentage = ({data}:{data:AttendanceData[]}) => {
  const totalClasses = data.length;
  const attendedClasses = data.filter((day) => day.yourAttendance > 0).length;
  return Math.round((attendedClasses / totalClasses) * 100);
};

export default function StudentDashboard() {
  const currentAttendance = calculateAttendancePercentage({data});

  return (
    <div className="min-h-screen bg-[#f8eee3] p-6 text-white font-sans relative">
      <div className="logo_with_dashboard rounded-bl-2xl rounded-br-2xl bg-[#c0bfbf] w-fit p-2">
        <p className="font-bold text-2xl text-blue-900">QuickAttend</p>
      </div>

      <div className="flex justify-between items-center mb-6 bg-amber-400 p-4 rounded-2xl z-30 drop-shadow-2xl sticky top-2">
        <h1 className="text-3xl font-bold text-blue-900">Student Dashboard</h1>
        <div className="options flex justify-between gap-4">
          <Bell className="text-blue-900 w-6 h-6 cursor-pointer" />
          <LogOut className="text-blue-900 w-6 h-6 cursor-pointer" />
        </div>
      </div>

      <Card className="bg-blue-900 text-white p-6 rounded-2xl flex items-center shadow-lg">
        <Avatar
          src="https://ui-avatars.com/api/?name=John+Doe"
          className="mr-4 w-16 h-16"
        />
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-sm text-gray-300">Roll No: 12345</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold mb-4 bg-amber-400 rounded-2xl w-fit p-2">
            Attendance Overview
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
              <XAxis dataKey="date" stroke="#1e3a8a" />
              <YAxis stroke="#1e3a8a" />
              <Tooltip contentStyle={{ backgroundColor: "#f8eee3", color: "black" }} />
              <Line
                type="monotone"
                dataKey="totalClasses"
                stroke="#FF6347" // Total classes line
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="yourAttendance"
                stroke="#1e3a8a" // Your attendance line
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold mb-4 flex items-center bg-amber-400 p-2 rounded-2xl w-fit">
            <Calendar className="mr-2" /> Today's Classes
          </h2>
          <ul className="space-y-3">
            {classes.map((cls, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md"
              >
                <div>
                  <p className="text-base font-medium text-white">{cls.subject}</p>
                  <p className="text-sm text-gray-400">{cls.time}</p>
                </div>
                <p
                  className={`text-sm font-semibold flex items-center ${
                    cls.status === "Present" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> {cls.status}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="bg-blue-900 text-white p-6 mt-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold mb-4 bg-amber-400 rounded-2xl w-fit p-2">
          Current Semester Attendance
        </h2>
        <p className="text-2xl font-semibold">{currentAttendance}%</p>
      </Card>
    </div>
  );
}
