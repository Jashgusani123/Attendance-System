import {
    ArrowDownwardRounded,
    ArrowUpwardRounded,
    Class,
    NotificationAddRounded
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Alert, Avatar, Box, Button, Card, Dialog, DialogContent, Stack, SvgIconTypeMap, Switch, TextField, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LandingNav from "../Components/LandingNav";
import LoadingLayer from "../Components/LoadingLayer";
import { useLogoutMutation as StudentLogoutMutation } from "../Redux/API/Student";
import { useLogoutMutation as TeacherLogoutMutation } from "../Redux/API/Teacher";
import { studentNotExits } from "../Redux/slices/StudentSlices";
import { teacherNotExits } from "../Redux/slices/TeacherSlice";
import { StudentReducerInitialState } from "../Types/API/StudentApiType";
import { TeacherReducerInitialState } from "../Types/API/TeacherApiType";
import { Capitalize, WordsCapitalize } from "../Utils/toCapitalize";

const Setting = () => {
    const { loading: studentLoading, student } = useSelector(
        (state: { student: StudentReducerInitialState }) => state.student
    );
    const { loading: teacherLoading, teacher } = useSelector(
        (state: { teacher: TeacherReducerInitialState }) => state.teacher
    );

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const type = location.state?.type;
    const [StudentLogout] = StudentLogoutMutation();
    const [TeacherLogout] = TeacherLogoutMutation();

    const [open, setOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [date, setdate] = useState<string>();

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handelLogout = async () => {
        if (type === "Student") {
            const res = await StudentLogout(null);
            if (res.data?.success) {
                dispatch(studentNotExits());
                navigate("/")
            } else {
                alert(res.error)
            }

        } else {
            const res = await TeacherLogout(null);
            if (res.data?.success) {
                dispatch(teacherNotExits());
                navigate("/")
            } else {
                alert(res.error)
            }

        }
    }
    const handleDelete = () => {
        setOpen(true); // Open the confirmation dialog
    };
    const confirmDelete = () => {
        setOpen(false)
        handelLogout();
    }

    useEffect(() => {
        if (type == "Student") {
            const datew = new Date(student?.collegeJoiningDate!).toISOString().split("T")[0];
            setdate(datew);
        }
    }, []);
    const userType = student ? student : teacher;

    return studentLoading || teacherLoading ? <><LoadingLayer type={type} /></> : (
        <>
            {type == "Student" ? <LandingNav path="/student/dashboard" home="/student" /> : <LandingNav path="/teacher/dashboard" home="/teacher" />}
            <section className="flex justify-around flex-col gap-5 items-center mt-5 w-full">

                <Fields icon={AccountCircleIcon} Name="Profile" handleClick={() => toggleSection("profile")} isOpen={openSection === "profile"} />
                {openSection === "profile" && (
                    <SectionCard title="Change Name" value={WordsCapitalize(userType!, "fullName")} name="fullName" />
                )}

                <Fields icon={AccountCircleIcon} Name="Account & Security" handleClick={() => toggleSection("security")} isOpen={openSection === "security"} />
                {openSection === "security" && (
                    <>
                        <SectionCard title="Change Email" value={userType?.email} name="email" />
                        <SectionCard title="Change Password" value={userType?.password} type="password" name="password" />
                    </>
                )}

                <Fields icon={NotificationAddRounded} Name="Notifications" handleClick={() => toggleSection("notifications")} isOpen={openSection === "notifications"} />
                {openSection === "notifications" && (
                    <Box className="w-[85%] bg-white p-4 rounded-lg shadow-md flex items-center">
                        <Typography className="mr-2">Enable Notifications</Typography>
                        <Switch />
                    </Box>
                )}

                <Fields icon={Class} Name="Academic" handleClick={() => toggleSection("academic")} isOpen={openSection === "academic"} />
                {openSection === "academic" && (
                    type === "Student" ? (
                        <>
                            <SectionCard title="Enrollment Number" value={student?.enrollmentNumber} name="enrollmentNumber" />
                            <SectionCard title="College Name" value={WordsCapitalize(student!, "collegeName")} name="collegeName" />
                            <SectionCard title="Semester" value={student?.semester} name="semester" />
                            <SectionCard title="College Joining Date" value={date} type="date" name="collegeJoiningDate" />
                            <SectionCard title="Department" value={WordsCapitalize(student!, "departmentName")} name="departmentName" />
                        </>
                    ) : (
                        <SectionCard title="Department" value={WordsCapitalize(teacher!,"departmentName")} />
                    )
                )}

                <Box className="w-[85%] flex justify-between mt-4">
                    <Button variant="contained" color="primary" onClick={handelLogout}>Logout</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>Delete Account</Button>
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        <Alert severity="error">
                            You really want to delete this account? <br />
                            This will delete your whole data, so you can't use this website.
                        </Alert>
                        <Box className="flex justify-end mt-4">
                            <Button onClick={() => setOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={confirmDelete} color="error" variant="contained">
                                Confirm Delete
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            </section>
        </>
    );
};

const SectionCard = ({ title, value, type = "text", name }: { title: string, value?: string | number, type?: string, name?: string }) => {

    return (
        <Box className="w-[85%] bg-white p-4 rounded-lg shadow-md">
            <Stack spacing={2}>
                <div className="containerOfFildes flex justify-between">
                    <div className="innercon flex w-full flex-col items-center" >
                        <Typography variant="subtitle1" className="w-full" >{title}</Typography>
                        <TextField fullWidth variant="outlined" className="w-full" placeholder={`Enter ${title.toLowerCase()}`} value={value} type={type} name={name} disabled />
                    </div>

                </div>
            </Stack>
        </Box>
    );
};

const Fields = ({ icon: Icon, Name, handleClick, isOpen }: {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    Name: string,
    handleClick: MouseEventHandler<HTMLDivElement>,
    isOpen: boolean
}) => {
    return (
        <Card className="bg-blue-900 w-[90%] text-white p-6 h-auto rounded-2xl flex justify-between items-center shadow-lg cursor-pointer" onClick={handleClick}>
            <div className="left flex items-center">
                <Avatar className="bg-white text-blue-900">
                    <Icon />
                </Avatar>
                <div className="ml-3">
                    <Typography className="text-xl text-black">{Name}</Typography>
                </div>
            </div>
            <div className="right">
                {isOpen ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
            </div>
        </Card>
    );
};

export default Setting;
