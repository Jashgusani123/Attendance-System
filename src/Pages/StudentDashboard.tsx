import { useState, useEffect } from "react";
import { Avatar, Card } from "@mui/material";
import { Bell, Calendar, CheckCircle, LogOut } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CartesianGrid, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line as RechartLine } from "recharts";

// Sample student data
const studentId = "12345"; // Unique student ID
const studentName = "John Doe";

// Sample attendance data
const data = [
  { date: "Mon", totalClasses: 7, yourAttendance: 7 },
  { date: "Tue", totalClasses: 7, yourAttendance: 5 },
  { date: "Wed", totalClasses: 7, yourAttendance: 6 },
  { date: "Thu", totalClasses: 7, yourAttendance: 7 },
  { date: "Fri", totalClasses: 7, yourAttendance: 6 },
  { date: "Sat", totalClasses: 7, yourAttendance: 4 },
  { date: "Sun", totalClasses: 7, yourAttendance: 0 },
];

// Sample class schedule
const classes = [
  { subject: "Math", time: "9:00 AM", status: "Pending" },
  { subject: "Physics", time: "11:00 AM", status: "Pending" },
  { subject: "Chemistry", time: "2:00 PM", status: "Pending" },
];

// const COLLEGE_LOCATION = { lat: 21.73097858401702, lon: 70.44603628790641 }; // College location

// // Calculate distance between two locations (Haversine formula)
// const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
//   const R = 6371; // Radius of Earth in km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//       Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Convert to meters
// };

export default function StudentDashboard() {
  // const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("User Location:", position.coords.latitude, position.coords.longitude);
  //         setLocation({
  //           lat: position.coords.latitude,
  //           lon: position.coords.longitude,
  //         });
  //       },
  //       (error) => console.error("Error getting location:", error)
  //     );
  //   }
  // }, []);

  // // Check if student is within 500m of college
  // const isStudentNearCollege = () => {
  //   if (!location) return false;
  //   const distance = calculateDistance(location.lat, location.lon, COLLEGE_LOCATION.lat, COLLEGE_LOCATION.lon);
  //   // console.log(distance);

  //   return distance <= 500;
  // };

  return (
    <div className="min-h-screen bg-[#f8eee3] p-6 text-white font-sans">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6 bg-amber-400 p-4 rounded-2xl">
        <h1 className="text-3xl font-bold text-blue-900">Student Dashboard</h1>
        <div className="options flex gap-4">
          <Bell className="text-blue-900 w-6 h-6 cursor-pointer" />
          <LogOut className="text-blue-900 w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Student Info */}
      <Card className="bg-blue-900 text-white p-6 rounded-2xl flex items-center shadow-lg">
        <Avatar src="https://ui-avatars.com/api/?name=John+Doe" className="mr-4 w-16 h-16" />
        <div>
          <h2 className="text-xl font-semibold">{studentName}</h2>
          <p className="text-sm text-gray-300">Roll No: {studentId}</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Attendance Overview */}
        <Card className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold mb-4 bg-amber-400 rounded-2xl w-fit p-2">Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
              <XAxis dataKey="date" stroke="#1e3a8a" />
              <YAxis stroke="#1e3a8a" />
              <Tooltip contentStyle={{ backgroundColor: "#f8eee3", color: "black" }} />
              <RechartLine type="monotone" dataKey="totalClasses" stroke="#FF6347" strokeWidth={3} dot={false} />
              <RechartLine type="monotone" dataKey="yourAttendance" stroke="#1e3a8a" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Today's Classes */}
        <Card className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold mb-4 flex items-center bg-amber-400 p-2 rounded-2xl w-fit">
            <Calendar className="mr-2" /> Today's Classes
          </h2>
          <ul className="space-y-3">
            {classes.map((cls, index) => (
              <li key={index} className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md">
                <div>
                  <p className="text-base font-medium text-white">{cls.subject}</p>
                  <p className="text-sm text-gray-400">{cls.time}</p>
                </div>
                {/* Join Button */}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  // onClick={() => {
                  //   if (isStudentNearCollege()) {
                  //     setShowQRCode(true); // Show QR code when "Join" is clicked
                  //   } else {
                  //     alert("You must be within 500m of the college to join the class.");
                  //   }
                  // }}
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* QR Code Section */}
      {showQRCode && (
        <Card className="bg-blue-900 text-white p-6 mt-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-bold mb-4 bg-amber-400 rounded-2xl w-fit p-2">Scan QR to Mark Attendance</h2>
          <QRCodeSVG value={`student_id=${studentId}&timestamp=${Date.now()}`} size={200} />
        </Card>
      )}
    </div>
  );
}
