import { TableBody, TableCell, TableContainer, Table, TableHead, TableRow, Paper, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import { useGetAllStudentMutation } from "../../Redux/API/Hod"
import { Link, useNavigate } from "react-router-dom"
import { Bell } from "lucide-react"
import Notification from "../Notification"

interface AllStudentInfo {
    fullName: string,
    enrollmentNumber: string,
    departmentName: string,
    semester: number,
    present: number,
    absent: number
}
interface NotificationType {
    _id: string;
    upperHeadding: string;
    description: string;
}
const ShowAllStudent = () => {
    const [studentsData, setStudentsData] = useState<AllStudentInfo[]>([]);
    const [GetAllStudentsData] = useGetAllStudentMutation();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications] = useState<NotificationType[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const GetStudentsData = async () => {
            try {
                const response = await GetAllStudentsData(null);
                if (response && "data" in response && response.data?.success && response.data?.StudentData) {
                    setStudentsData(response.data?.StudentData);
                } else {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);

            }
        }
        GetStudentsData();
    }, []);

    return (
        <>
        <div className="show_all_students_container flex flex-col justify-around gap-3 p-4">

            <div className="flex flex-col flex-wrap  sm:w-[30%] w-full gap-4">
                {/* Navbar at the very top */}
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
                            <span onClick={() => setShowNotifications(!showNotifications)} className="text-blue-900 relative rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md">
                                <Tooltip title="Notification">
                                    <Bell size={24} />
                                </Tooltip>
                                {notifications.length > 0 && (
                                    <span className="absolute top-[-8px] right-[0px] bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                        {notifications.length}
                                    </span>
                                )}
                                {showNotifications && (
                                    <div className="absolute top-[0px] right-[-40px] z-50 bg-white shadow-lg rounded-lg">
                                        <Notification fun={setShowNotifications} notifications={notifications} />
                                    </div>
                                )}
                            </span>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="relative z-50 p-4">
                {/* Table Container */}
                <TableContainer component={Paper} className="mt-5 h-full mb-5 shadow-lg">
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
                            {studentsData.map((student, index) => (
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
            </div>
        </div>

        </>
    )
}

export default ShowAllStudent