import { Avatar, Card } from "@mui/material";
import { Bell, Calendar, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, LineChart, Line as RechartLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import socket from "../Components/Socket";
import { StudentReducerInitialState } from "../Types/API/StudentApiType";
import { GetMyLocation, isStudentWithinDistance } from "../Utils/LocationFunctions";
import { submitAttendance } from "../Utils/ValidationFunction";

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
  location: { latitude: number; longitude: number };
}

interface Location {
  latitude: number;
  longitude: number;
}

export default function StudentDashboard() {
  const { loading: studentLoading, student } = useSelector(
    (state: { student: StudentReducerInitialState }) => state.student
  );
  const [classDetails, setClassDetails] = useState<ClassDetail[]>([]);
  const [allClasses] = useState<string[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);

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



  useEffect(() => {
    const AllFunc = async () => {
      GetMyLocation(setLoadingLocation, setLocation);
      // Add any other async operations here
      const response = await fetch(`${import.meta.env.VITE_SERVER}/student/getclasses`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch classes");

      const data = await response.json();
      setClassDetails(data.upcomingClasses);
    };

    AllFunc();
  }, []);
  useEffect(() => {
    let watchId: number | null = null;
  
    const fetchLocation = () => {
      watchId = GetMyLocation(setLoadingLocation, setLocation);
    };
  
    fetchLocation(); // Start tracking location on mount
  
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId); // Cleanup watchPosition on unmount
      }
    };
  }, []);
  
  
  

  return studentLoading || loadingLocation ? <>Loding...</> : (
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
                    onClick={async () => {
                      setLoadingLocation(true);
                      GetMyLocation(setLoadingLocation, setLocation);

                      if (location) {
                        const isWithinRange = isStudentWithinDistance(
                          location,
                          cls.location, // Replace with teacher's actual location
                          1000 // Distance in meters
                        );

                        if (isWithinRange) {
                          await submitAttendance(student?.enrollmentNumber!, cls._id, () => {});
                        } else {
                          setLocation(null)
                          alert("You are outside the allowed location range.");
                        }
                      } else {
                        alert("Could not determine your location. Please try again.");
                      }

                      setLoadingLocation(false);
                    }}
                  >
                    Join
                  </button>

                </li>
              ))}
            </ul>
          )}
        </Card>

      </div>

    </div>
  );
}
