import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import socket from "../../Components/Socket";

interface StudentAttendance {
    name: string;
    isPresent: boolean;
    erno: number;
}

const AttendanceSheet = () => {
    const location = useLocation();
    const Subject = location.state?.sub;
    const classID = location.state?.classID;
    const [Accepted, setAccepted] = useState<StudentAttendance[]>([]);
    const [IsLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Live updates from socket
    useEffect(() => {

        socket.on("approval", (data: StudentAttendance) => {

            setAccepted((prev) => {
                const isAlreadyPresent = prev.some(student => student.erno === data.erno);
                if (!isAlreadyPresent) {
                    return [...prev, data];
                }
                return prev;
            });
        });

        return () => {
            socket.off("approval"); // Cleanup listener
        };
    }, []);

    // Fetch attendance from API
    useEffect(() => {
        const fetchAttendance = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}/teacher/attendance`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ classID }), // Corrected to send an object
                });

                const data = await response.json();

                if (data.success) {
                    const formattedData = data.allAttendance.map((item: any) => ({
                        erno: item.erno,
                        isPresent: item.isPresent,
                        name: item.id
                    }));

                    setAccepted((prev) => {
                        // Merge API data with existing socket data, avoiding duplicates
                        const merged = [...prev];

                        formattedData.forEach((newStudent: StudentAttendance) => {
                            if (!merged.some(student => student.erno === newStudent.erno)) {
                                merged.push(newStudent);
                            }
                        });

                        return merged;
                    });
                }else{
                    return navigate("/teacher");
                }
            } catch (error) {
                navigate("/teacher");
                alert("Something in Server Wrong !! Try After some Time...")
            } finally{
                setIsLoading(false);
            }
        };

        fetchAttendance();
    }, [classID]); // Re-fetch when classID changes

    return IsLoading ? <>
        <Box sx={{ width: "100%" , height:"100%" , padding:"0px "}} >
            <Skeleton height={"200px"}/>
            <Skeleton animation="wave" height={"10%"} />
            <Skeleton height={"10%"}/>
            <Skeleton animation="wave" height={"10%"}/>
            <Skeleton height={"10%"}/>
            <Skeleton animation="wave" height={"10%"}/>
            <Skeleton height={"10%"}/>  
        </Box>
    </> : (
        <>
            <div className="header bg-blue-800 p-2 flex items-center flex-wrap justify-around">
                <div className="left">
                    <Link to={"/"} className="font-bold text-4xl text-amber-500">QuickAttend</Link>
                </div>
                <div className="right flex flex-col">
                    <div className="top flex justify-end">
                        <p className="font-bold text-2xl text-white ">AttendanceSheet</p>
                    </div>
                    <div className="bottom flex gap-4 justify-end">
                        <p className="text-zinc-400">Computer</p>
                        <p className="text-zinc-400">Semester - 4</p>
                        <p className="text-zinc-400">{Subject}</p>
                    </div>
                </div>
            </div>
            <section className="m-2 flex gap-4 flex-col">
                {Accepted.length > 0 && Accepted.map((i) => (
                    <Student key={i.erno} name={i.name} isPresent={i.isPresent} erno={i.erno} />
                ))}
            </section>
        </>
    );
};

const Student = ({ name, isPresent, erno }: { name: string, isPresent: boolean, erno: number }) => {

    return (
        <div className="box flex justify-between items-center p-4 bg-amber-400 rounded-lg">
            <div className="left flex justify-around items-center gap-2">
                <div className="name border-r-2 border-zinc-900 p-2">{name}</div>
                <div className="er_number ">{erno}</div>
            </div>
            <div className="right flex justify-between gap-2">
                {isPresent
                    ? <p className="text-green-600 font-bold border-2 border-green-500 p-2 rounded-md hover:bg-green-600 hover:text-white">Present</p>
                    : <p className="text-red-700 font-bold border-2 border-red-600 p-2 rounded-md hover:bg-red-700 hover:text-white">Absent</p>
                }
            </div>
        </div>
    );
};

export default AttendanceSheet;
