import { Settings } from "@mui/icons-material";
import { Button, Card, CardContent, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useGetAllNotificationMutation, useGetAllStudentMutation, useGetAllTeachersMutation } from "../../Redux/API/Hod";
import Notification from "../Notification";

interface NotificationType {
  _id: string;
  upperHeadding: string;
  description: string;
  type:string;
  pandingId?:string
}
interface AllStudentInfo {
  fullName: string,
  enrollmentNumber: string,
  departmentName: string,
  semester: number,
  present: number,
  absent: number
}

interface AllTeacherInfo {
  fullName: string,
  _id: string,
  avatarName: string
}

const HodDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [studentsData, setStudentsData] = useState<AllStudentInfo[]>([]);
  const [teachersData, setTeachersData] = useState<AllTeacherInfo[]>([]);
  const [GetAllStudentsData] = useGetAllStudentMutation()
  const [GetAllTeachersData] = useGetAllTeachersMutation()
  const [GetAllNotificationData] = useGetAllNotificationMutation()
  const [visibleCount, setVisibleCount] = useState(4);
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return; // ⛔ Prevent if already fetched
    dataFetchedRef.current = true;     // ✅ Mark as fetched
  
    const fetchData = async () => {
      const GetStudentsData = async () => {
        try {
          const response = await GetAllStudentsData(null);
          if (response?.data?.success && response.data?.StudentData) {
            setStudentsData(response.data.StudentData);
          } else {
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      const GetTeachersData = async () => {
        try {
          const response = await GetAllTeachersData(null);
          if (response?.data?.success && response.data?.TeacherData) {
            setTeachersData(response.data.TeacherData);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      const GetNotificationsData = async () => {
        try {
          const response = await GetAllNotificationData(null);
          if (response?.data?.success && response.data?.notifications) {
            setNotifications(response.data.notifications);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      await Promise.all([
        GetTeachersData(),
        GetStudentsData(),
        GetNotificationsData(),
      ]);
    };
  
    fetchData();
  }, []);
  const handleSetting = () => {
    navigate("/hod/setting", { state: { type: "Hod" } });
  };
  const manageBtn = (id:string) =>{
    navigate("/hod/manage" ,{state:{id:id}} )
  };
  const analysisBtn = (id:string) =>{
    navigate("/hod/analysis" ,{state:{id:id}} )
  };
  const showStudentList = ()=>{
    navigate("/hod/student_list")
  };
  return (
    <>
      {/* Navbar */}
      <div className="landing_navbar sticky top-2 mx-4 h-14 w-auto z-50">
        <nav className="flex justify-between items-center p-4 w-full h-full bg-amber-400 rounded-2xl shadow-lg">
          <div className="image">
            <Link to={"/"} className="font-bold text-2xl text-blue-900">
              QuickAttend
            </Link>
          </div>
          <div className="flex justify-between items-center w-36 ">
            <Tooltip title="GraphView">
              <span className="text-blue-900 rounded-full flex items-center justify-center text-xl w-10 h-10 cursor-pointer" onClick={() => navigate("/hod/view")}>View</span>
            </Tooltip>
            <span onClick={handleSetting} className="text-blue-900 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md relative">
              <Tooltip title="Setting">
                <Settings />
              </Tooltip>
            </span>
            <span onClick={() => setShowNotifications(!showNotifications)} className="text-blue-900 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md relative">
              <Tooltip title="Notification">
                <Bell size={24} />
              </Tooltip>

              {notifications.length > 0 && (
                <span className="absolute top-[-5px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {notifications.length}
                </span>
              )}
              {showNotifications && (
                <div className="absolute top-[-35px] right-0 z-50 bg-white shadow-lg rounded-lg">
                  <Notification fun={setShowNotifications} notifications={notifications} type="Hod" />
                </div>
              )}
            </span>
          </div>
        </nav>
      </div>

      {/* Background Images and Motion */}
      <div className="relative w-full sm:h-[89vh] h-[70%] overflow-hidden">
        <img
          src="https://i.pinimg.com/originals/97/b5/22/97b52219da79ce6bf303cc93c9b352e4.gif"
          alt="Waving Student"
          className="WavingStudent absolute top-1 left-2 "
        />
        <img
          src="https://i.pinimg.com/originals/ac/14/0a/ac140a627af854f14c7f653efd7d53ae.gif"
          alt="Intro"
          className="intro_Images z-30 sm:flex hidden"
        />

        {/* Animated Welcome Section */}
        <motion.div
          initial={{ x: "-100%", opacity: 0, rotate: -15, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute sm:top-[30%] sm:left-[0%] top-[25%] left-[0%] z-40 p-6"
        >
          <div className="bg-[#0e578c] sm:p-6 p-4 rounded-lg shadow-lg w-[100%] sm:w-[600px] h-fit ">
            <p className="text-zinc-800 text-xl font-extrabold">HOD Dashboard</p>
            <p className="lg:text-[30px] font-bold text-white text-2xl">
              <span className="text-amber-400">
                <Typewriter
                  words={["Welcome,", "Respected HOD,", "Jash Gusani !!"]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
              <br />
              &nbsp;&nbsp;&nbsp;Empower your institution with seamless attendance tracking! 📚✅
              Manage student records digitally, track progress, and enhance efficiency effortlessly. 🚀📈🎯
            </p>
          </div>
        </motion.div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-40 p-6">
        {/* Title */}
        <Typography variant="h5" className="p-4 sticky top-2 bg-amber-400 rounded-2xl shadow-lg text-blue-900 font-bold uppercase text-start z-50">
          Teachers
        </Typography>
        <div className="teacherCard_container flex justify-around flex-wrap">
          {/* Teacher Card */}
          {teachersData.length > 0 && teachersData.map((teacher) => (
            <>
              <Card className="mt-5 mx-auto p-5 w-72 shadow-lg rounded-lg border border-gray-200" key={teacher._id}>
                <CardContent className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 flex items-center justify-center bg-blue-500 text-white text-3xl font-bold rounded-full shadow-md">
                    {teacher.avatarName}
                  </div>
                  <Typography variant="h6" className="mt-3 text-gray-800 font-semibold">
                    {teacher.fullName}
                  </Typography>
                  <Typography variant="body2" className="mt-2 text-gray-600">
                    Creative developer exploring innovation with passion and dedication daily.
                  </Typography>

                  <Stack direction="row" spacing={2} className="mt-4">
                    <Button variant="contained" color="primary" onClick={()=>manageBtn(teacher._id)} className="z-30">Manage</Button>
                    <Button variant="contained" color="secondary" onClick={()=>analysisBtn(teacher._id)} className="z-30">Analysis</Button>
                  </Stack>
                </CardContent>
              </Card>
            </>
          ))}

        </div>
      </div>
      <div className="relative z-50 p-6">
        {/* Sticky Header */}
        <Typography
          variant="h5"
          className="p-4 sticky top-2 bg-amber-400 rounded-2xl shadow-lg text-blue-900 font-bold uppercase text-start z-50"
        >
          Students
        </Typography>

        {/* Table Container */}
        <TableContainer component={Paper} className="mt-5 mb-5 shadow-lg">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="font-bold text-lg">Student Name</TableCell>
                <TableCell className="font-bold text-lg">Semester</TableCell>
                <TableCell className="font-bold text-lg">Department</TableCell>
                <TableCell className="font-bold text-lg">Enrollment No</TableCell>
                <TableCell className="font-bold text-lg">Present %</TableCell>
                <TableCell className="font-bold text-lg">Absent %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.slice(0, visibleCount).map((student, index) => (
                <TableRow key={index} className="hover:bg-gray-100">
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>{student.departmentName}</TableCell>
                  <TableCell>{student.enrollmentNumber}</TableCell>
                  <TableCell className="text-green-600 font-bold">{student.present}%</TableCell>
                  <TableCell className="text-red-600 font-bold">{student.absent}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {studentsData.length > visibleCount && (
        <button
          className="mt-2 rounded-[10px] text-white p-2 bg-zinc-500"
          onClick={() => {
            setVisibleCount(visibleCount + 5)
            showStudentList()
          }}
        >
          Show More
        </button>
      )}
      </div>
    </>
  );
};

export default HodDashboard;
