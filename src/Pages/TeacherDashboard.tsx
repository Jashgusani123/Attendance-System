import { Add } from "@mui/icons-material";
import { Avatar, Button, Card } from "@mui/material";
import { Bell, Calendar, FileText } from "lucide-react";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import CreateClassDialog from "../Components/Dialog";
import LoadingLayer from "../Components/LoadingLayer";
import socket from "../Components/Socket";
import { TeacherReducerInitialState } from "../Types/API/TeacherApiType";
import Notification from "./Notification";


const attendanceGraphData = [
  { date: "Mon", totalStudents: 70, studentsAttended: 60 },
  { date: "Tue", totalStudents: 70, studentsAttended: 50 },
  { date: "Wed", totalStudents: 70, studentsAttended: 65 },
  { date: "Thu", totalStudents: 70, studentsAttended: 68 },
  { date: "Fri", totalStudents: 70, studentsAttended: 63 },
  { date: "Sat", totalStudents: 70, studentsAttended: 62 },
  { date: "Sun", totalStudents: 70, studentsAttended: 55 },
];

interface ClassFormData {
  subjectName: string;
  startingTime: string;
  endingTime: string;
  semester: string;
  department: string;
  location: { latitude: number; longitude: number };
}

interface ClassType {
  _id: string;
  subjectName: string;
  starting: string;
  ending: string;
  semester: string;
  departmentName: string;
  startingTime?: string;  // Optional fallback fields
  endingTime?: string;
}
interface NotificationType {
  _id: string;
  upperHeadding: string;
  description: string;
}

export default function TeacherDashboard() {
  const { loading: teacherLoading, teacher } = useSelector(
    (state: { teacher: TeacherReducerInitialState }) => state.teacher
  );

  const [Classes, setClasses] = useState<ClassType[]>([]);
  const [createClass, setCreateClass] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ClassFormData>({
    subjectName: "",
    startingTime: "",
    endingTime: "",
    semester: "",
    department: "",
    location: { latitude: 0, longitude: 0 },
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);



  const navigate = useNavigate();

  const attendancesheet = ({ sub, classID }: { sub: string, classID: string }) => {
    navigate("/attendance", { state: { sub, classID } });
  };

  const handleCreateClass = () => {
    setCreateClass(true);
  };

  const handleCloseDialog = () => {
    setCreateClass(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate time
    const today = new Date().toISOString().split("T")[0];
    const startDate = new Date(`${today}T${formData.startingTime}`);
    const endDate = new Date(`${today}T${formData.endingTime}`);

    if (endDate <= startDate) {
      console.error("Error: Ending time must be after starting time!");
      return; // Stop execution if validation fails
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/class/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          subjectName: formData.subjectName,
          starting: moment().format("YYYY-MM-DD") + " " + formData.startingTime,  // Store full date
          ending: moment().format("YYYY-MM-DD") + " " + formData.endingTime,      // Store full date
          semester: formData.semester,
          departmentName: formData.department,
          location: {
            latitude: formData.location.latitude.toFixed(4),
            longitude: formData.location.longitude.toFixed(4),
          },
          teacherName: teacher?.fullName,
        }),

      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const data = await response.json();

      // Emit event only if data is valid
      if (data?.newClass) {
        socket.connect();
        socket.emit("start-class", data.newClass.allStudent, formData, data.newClass._id);

        // Reset form
        setFormData({
          subjectName: "",
          startingTime: "",
          endingTime: "",
          semester: "",
          department: "",
          location: { latitude: 0, longitude: 0 },
        });

        setCreateClass(false); // ✅ Close the dialog after successful submission
      }
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/teacher/getclasses`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch classes");

        const data = await response.json();
        setClasses(data.upcomingClasses);
      } catch (error) {
        setError("Could not load classes.");
      }

    };
    socket.emit("register-teacher", teacher?.fullName);
    const getAllNotifications = async () => {
      try {
          const response = await fetch(`${import.meta.env.VITE_SERVER}/notification/get`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ id:teacher?._id}), // Pass any required body data
          });
          const data = await response.json();
          if (data.success) {
              setNotifications(data.notifications);
          } else {
              alert("Failed to fetch notifications");
          }
      } catch (error) {
          console.error("Error fetching notifications:", error);
      }
  };

  getAllNotifications();
    fetchClasses();
  }, [])

  useEffect(() => {
    socket.on("class-live", (receivedClassDetails) => {

      // Check if the received class _id is in the list
      if (!Classes.includes(receivedClassDetails._id)) {
        setClasses((prevDetails) => [...prevDetails, receivedClassDetails]);
      } else {
        console.log(`Class ${receivedClassDetails._id} already exists, not adding.`);
      }
    });

    return () => {
      socket.off("class-live");
    };
  }, [Classes]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
        
        setLoadingLocation(false);
      },
      () => {
        setLoadingLocation(false);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 // Force real-time location update
      }
    );
  
    return () => navigator.geolocation.clearWatch(watchId);
  }, [window.onload]);
  
  
  return teacherLoading || loadingLocation ? <>
    <LoadingLayer type={"Teacher"} />
  </> : (
    <>
      <div className="min-h-screen bg-[#f8eee3] p-6 text-white font-sans">
        {/* Logo */}
        <div className="logo_with_dashboard rounded-bl-2xl rounded-br-2xl bg-[#c0bfbf] w-fit p-2">
          <p className="font-bold text-2xl text-blue-900">QuickAttend</p>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-amber-400 p-4 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-blue-900">Teacher Dashboard</h1>
          <div className="optionss flex flex-wrap gap-3 items-center">
            <span onClick={handleCreateClass}>
              <Add className="text-blue-900 w-6 h-6 cursor-pointer border-2 border-blue-900 rounded-4xl" titleAccess="Create Class" />
            </span>
            <span onClick={() => setShowNotifications(!showNotifications)} className="relative cursor-pointer">
              <Bell className="text-blue-900 w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute top-[-10px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {notifications.length}
                </span>
              )}
              {showNotifications && (
                <div className="absolute top-[-35px] right-0 z-50 bg-white shadow-lg rounded-lg">
                  <Notification fun={setShowNotifications} notifications={notifications}/>
                </div>
              )}
            </span>

          </div>
        </div>

        {/* Create Class Form Dialog */}
        <CreateClassDialog createClass={createClass} handleCloseDialog={handleCloseDialog} handleInputChange={handleInputChange} formData={formData} handleSubmitForm={handleSubmitForm} loadingLocation={false} />

        {/* Profile Section */}
        <Card className="bg-blue-900 text-white p-6 rounded-2xl flex items-center shadow-lg">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${teacher?.fullName}`}
            className="mr-4 w-16 h-16"
          />
          <div>
            <h2 className="text-xl font-semibold">{teacher?.fullName}</h2>
            <p className="text-sm text-gray-300">Department: {teacher?.departmentName}</p>
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

          {/* Live Classes */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="w-[100%] lg:w-full">
            <Card className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-bold mb-4 flex items-center bg-amber-400 p-2 rounded-2xl w-fit">
                <Calendar className="mr-2" /> Live Classes
              </h2>
              <ul className="space-y-3">
                {Classes.map((i) => (
                  <li
                    key={i._id}
                    className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md"
                    onClick={() => attendancesheet({ sub: i.subjectName, classID: i._id })}
                  >
                    <div>
                      <p className="text-base font-medium text-white">{i.subjectName}</p>
                      <p className="text-sm text-gray-400">{i.starting ? i.starting : i.startingTime} - {i.ending ? i.ending : i.endingTime}</p>
                    </div>
                    <p className="text-sm font-semibold text-blue-500 cursor-pointer">View Details</p>
                  </li>
                ))}

              </ul>
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
                  onClick={() => attendancesheet({ sub: "WebDevelopment", classID: "67c2a48dc286005439bd4e64" })}
                >
                  <div>
                    <p className="text-base font-medium text-white">Web Development</p>
                    <p className="text-sm text-gray-400">9:00 AM</p>
                  </div>
                  <p className="text-sm font-semibold text-blue-500 cursor-pointer">View Details</p>
                </li>
                <li
                  className="flex justify-between items-center bg-[#183687] p-3 rounded-lg shadow-md"
                  onClick={() => attendancesheet({ sub: "Java", classID: "67c2a48dc286005439bd4e64" })}
                >
                  <div>
                    <p className="text-base font-medium text-white">Java</p>
                    <p className="text-sm text-gray-400">10:00 AM</p>
                  </div>
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
