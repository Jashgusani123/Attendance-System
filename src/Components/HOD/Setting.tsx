import { Alert, Avatar, Box, Button, Card, Dialog, DialogContent, Stack, SvgIconTypeMap, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { Bell } from "lucide-react";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notification from "../../Pages/Notification";
import { ArrowDownwardRounded, ArrowUpwardRounded, Class, NotificationAddRounded } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { HodReducerInitialState } from "../../Types/API/HodApiType";
import { useLogoutMutation as HodLogoutMutation } from "../../Redux/API/Hod";
import { HodNotExits } from "../../Redux/slices/HodSlices";
import LoadingLayer from "../LoadingLayer";


interface NotificationType {
    _id: string;
    upperHeadding: string;
    description: string;
}
const data = [
    {
        _id: "1",
        upperHeadding: "Hello",
        description: "Hii"
    }
]


const ViewPage = () => {
    const { loading: HodLoading, hod } = useSelector(
        (state: { hod: HodReducerInitialState }) => state.hod
    );
    const [openSection, setOpenSection] = useState<string | null>(null);
    
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [open, setOpen] = useState(false);
    const [HodLogout] = HodLogoutMutation();
    const location = useLocation();
    const type = location.state?.type;
    const dispatch = useDispatch();

    useEffect(() => {
        setNotifications(data);
    }, [])
    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handelLogout = async () => {
        if (type === "Hod") {
            const res = await HodLogout(null);
            if (res.data?.success) {
                dispatch(HodNotExits());
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

    return HodLoading ? (
        <><LoadingLayer type={type} /></>
    ) : (
        <>
        <div className="flex w-full flex-col h-screen p-4 gap-4">
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
                                onClick={() => navigate("/Hod")}
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
            {/* Main content */}
            <div className="flex flex-col w-full min-h-screen items-center">
                {/* Settings Section */}
                <div className="w-full max-w-full mt-6 p-4 justify-center items-center flex flex-col gap-4">
                    <Fields icon={AccountCircleIcon} Name="Profile" handleClick={() => toggleSection("profile")} isOpen={openSection === "profile"} />
                    {openSection === "profile" && <SectionCard title="Change Name" value={hod?.fullName} name="fullName" />}
    
                    <Fields icon={AccountCircleIcon} Name="Account & Security" handleClick={() => toggleSection("security")} isOpen={openSection === "security"} />
                    {openSection === "security" && (
                        <>
                            <SectionCard title="Change Email" value={hod?.email} name="email" />
                            <SectionCard title="Change Password" value={hod?.password} type="password" name="password" />
                        </>
                    )}
    
                    <Fields icon={NotificationAddRounded} Name="Notifications" handleClick={() => toggleSection("notifications")} isOpen={openSection === "notifications"} />
                    {openSection === "notifications" && (
                        <Box className="w-[80%] bg-white p-4 rounded-lg shadow-md flex items-center">
                            <Typography className="mr-2">Enable Notifications</Typography>
                            <Switch />
                        </Box>
                    )}
    
                    <Fields icon={Class} Name="Academic" handleClick={() => toggleSection("academic")} isOpen={openSection === "academic"} />
                    {openSection === "academic" && <SectionCard title="Department" value={hod!.departmentName} />}
    
                    <div className="flex justify-between w-full mt-4">
                        <Button variant="contained" color="primary" onClick={handelLogout}>Logout</Button>
                        <Button variant="contained" color="error" onClick={handleDelete}>Delete Account</Button>
                    </div>
                </div>
            </div>
    
            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Alert severity="error">
                        You really want to delete this account? This will delete your whole data, so you can't use this website.
                    </Alert>
                    <Box className="flex justify-end mt-4">
                        <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                        <Button onClick={confirmDelete} color="error" variant="contained">Confirm Delete</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            </div>
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

export default ViewPage;
