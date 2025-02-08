import {
    ArrowDownwardRounded,
    ArrowUpwardRounded,
    Class,
    NotificationAddRounded
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Button, Card, Stack, SvgIconTypeMap, Switch, TextField, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { MouseEventHandler, useState } from "react";
import LandingNav from "../Components/LandingNav";
import { useLocation } from "react-router-dom";

const Setting = () => {
    const location = useLocation();
    const type = location.state?.type ; 
    console.log(type);
    
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };
    const handelLogout = ()=>{}
    const handelDelete = ()=>{}

    return (
        <>
           {type == "Student" ?  <LandingNav path="/student/dashboard" /> :  <LandingNav path="/teacher/dashboard" />}

            <section className="flex justify-around flex-col gap-5 items-center mt-5 w-full">
                {/* Profile Section */}
                <Fields 
                    icon={AccountCircleIcon} 
                    Name="Profile" 
                    handleClick={() => toggleSection("profile")}
                    isOpen={openSection === "profile"} 
                />
                {openSection === "profile" && (
                    <Box className="w-[85%] bg-white p-4 rounded-lg shadow-md">
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">Change Name</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Enter your name" />
                            <Button variant="contained" color="primary">Save</Button>
                        </Stack>
                    </Box>
                )}

                {/* Account & Security Section */}
                <Fields 
                    icon={AccountCircleIcon} 
                    Name="Account & Security" 
                    handleClick={() => toggleSection("security")}
                    isOpen={openSection === "security"} 
                />
                {openSection === "security" && (
                    <Box className="w-[85%] bg-white p-4 rounded-lg shadow-md">
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">Change Email</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Enter new email" />
                            <Typography variant="subtitle1">Change Password</Typography>
                            <TextField fullWidth type="password" variant="outlined" placeholder="Enter new password" />
                            <Button variant="contained" color="primary">Save</Button>
                        </Stack>
                    </Box>
                )}

                {/* Notification Settings */}
                <Fields 
                    icon={NotificationAddRounded} 
                    Name="Notifications" 
                    handleClick={() => toggleSection("notifications")}
                    isOpen={openSection === "notifications"} 
                />
                {openSection === "notifications" && (
                    <Box className="w-[85%] bg-white p-4 rounded-lg shadow-md flex items-center">
                        <Typography className="mr-2">Enable Notifications</Typography>
                        <Switch />
                    </Box>
                )}

                {/* Academic Details */}
                <Fields 
                    icon={Class} 
                    Name="Academic" 
                    handleClick={() => toggleSection("academic")}
                    isOpen={openSection === "academic"} 
                />
                {openSection === "academic" && (
                    type === "Student" ? <>
                    <Box className="w-[85%] bg-white p-4 rounded-lg shadow-md">
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">Enrollment Number</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Enter enrollment number" />
                            <Typography variant="subtitle1">College Name</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Enter college name" />
                            <Typography variant="subtitle1">Semester</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Enter semester" />
                            <Typography variant="subtitle1">College Joining Date</Typography>
                            <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
                            <Typography variant="subtitle1">Department</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Enter department" />
                            <Button variant="contained" color="primary">Save</Button>
                        </Stack>
                    </Box>
                    </> : 
                    <>
                    <Box className="w-[85%] bg-white p-4 rounded-lg shadow-md">
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">Department</Typography>
                            <TextField fullWidth variant="outlined" placeholder="Enter department" />
                            <Button variant="contained" color="primary">Save</Button>
                        </Stack>
                    </Box>
                    </>
                    
                )}

                {/* Logout & Delete Account */}
                <Box className="w-[85%] flex justify-between mt-4">
                    <Button variant="contained" color="primary" onClick={handelLogout}>Logout</Button>
                    <Button variant="contained" color="error" onClick={handelDelete}>Delete Account</Button>
                </Box>
            </section>
        </>
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
