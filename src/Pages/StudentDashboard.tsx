import { Avatar, Card } from "@mui/material";
import { Bell, Calendar, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, LineChart, Line as RechartLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import QrScanner from "../Components/QrScanner";
import socket from "../Components/Socket";
import { StudentReducerInitialState } from "../Types/API/StudentApiType";

const data = [
  { date: "Mon", totalClasses: 7, yourAttendance: 7 },
  { date: "Tue", totalClasses: 7, yourAttendance: 5 },
  { date: "Wed", totalClasses: 7, yourAttendance: 6 },
  { date: "Thu", totalClasses: 7, yourAttendance: 7 },
  { date: "Fri", totalClasses: 7, yourAttendance: 6 },
  { date: "Sat", totalClasses: 7, yourAttendance: 4 },
  { date: "Sun", totalClasses: 7, yourAttendance: 0 },
];

interface ClassDetail {
  _id: string;
  subjectName: string;
  startingTime?: string;
  endingTime?: string;
  starting?: string;
  ending?: string;
}

export default function StudentDashboard() {
  const { loading: studentLoading, student } = useSelector(
    (state: { student: StudentReducerInitialState }) => state.student
  );
  const [showQRCode, setShowQRCode] = useState(false);
  const [classDetails, setClassDetails] = useState<ClassDetail[]>([]);
  const [allClasses, setAllClasses] = useState<string[]>([]);

  // Fetch enrolled classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/class/getAll`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ enrollmentNumber: student?.enrollmentNumber }),
        });
        const data = await response.json();

        if (data?.Classes) {
          console.log("Fetched Classes:", data.Classes);

          // Store only class _ids for quick lookup
          setAllClasses(data.Classes.map((cls: any) => cls._id));
          setClassDetails(data.Classes)
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [student?.enrollmentNumber]);

  // Handle incoming classes via socket
  useEffect(() => {
    socket.on("class-live", (receivedClassDetails) => {
      console.log("Received class details:", receivedClassDetails);

      // Check if the received class _id is in the list
      if (!allClasses.includes(receivedClassDetails._id)) {
        setClassDetails((prevDetails) => [...prevDetails, receivedClassDetails]);
      } else {
        console.log(`Class ${receivedClassDetails._id} already exists, not adding.`);
      }
    });

    return () => {
      socket.off("class-live");
    };
  }, [allClasses]); // Depend on `allClasses` to update filtering dynamically

  const handleScanSuccess = (data: string) => {
    console.log("Scanned Data:", data);
    setShowQRCode(false); // Hide scanner after success
  };

  return studentLoading?<>Loding...</>:(
    <div className="min-h-screen bg-[#f8eee3] p-6 text-white font-sans">
      {/* Logo Section */}
      <div className="logo_with_dashboard rounded-bl-2xl rounded-br-2xl bg-[#c0bfbf] w-fit p-2">
        <p className="font-bold text-2xl text-blue-900">QuickAttend</p>
      </div>

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
        <Avatar src={`https://ui-avatars.com/api/?name=${student?.fullName}`} className="mr-4 w-16 h-16" />
        <div>
          <h2 className="text-xl font-semibold">{student?.fullName}</h2>
          <p className="text-sm text-gray-300">Roll No: {student?.enrollmentNumber}</p>
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

          {classDetails.length === 0 ? (
            <p className="text-gray-300 text-center">No classes available</p>
          ) : (
            <ul className="space-y-3">
              {classDetails.map((cls, index) => (
                <li key={index} className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md">
                  <div>
                    <p className="text-base font-medium text-white">{cls.subjectName}</p>
                    <p className="text-sm text-gray-400">{cls.startingTime ? cls.startingTime : cls.starting} to {cls.endingTime ? cls.endingTime : cls.ending}</p>
                  </div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={()=>setShowQRCode(true)}
                  >
                    Join
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

      </div>
      {showQRCode && <QrScanner onScanSuccess={handleScanSuccess} onClose={() => setShowQRCode(false)} />}
     
    </div>
  );
}
