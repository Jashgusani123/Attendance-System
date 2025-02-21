import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import socket from "../Components/Socket";

interface StudentAttendance {
    name: string;
    isPresent: boolean;
    erno:number;
}

const AttendanceSheet = () => {
    const location = useLocation();
    const Subject = location.state?.sub;
    const [Accepted, setAccepted] = useState<StudentAttendance[]>([])


    useEffect(() => {
        socket.on("aproval", (data) => {
            console.log(data);

            setAccepted((prev) => {
                // Check if the student already exists
                const isAlreadyPresent = prev.some(student => student.name === data.name);
                if (!isAlreadyPresent) {
                    return [...prev, data]; // Add only if not already present
                }
                return prev; // Return previous state if duplicate
            });
        });

        return () => {
            socket.off("aproval"); // Cleanup to avoid multiple listeners
        };
    }, []);


    return (
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
                    <Student key={i.name} name={i.name} isPresent={i.isPresent} erno={i.erno} />
                ))}
            </section>
        </>
    )
}

const Student = ({ name, isPresent , erno}: { name: string, isPresent: boolean , erno:number }) => {
    return (
        <>
            <div className="box flex justify-between items-center p-4 bg-amber-400 rounded-lg">
                <div className="left flex justify-around items-center gap-2">
                    <div className="er_number border-r-2 border-zinc-900 p-2">{erno}</div>
                    <div className="name">{name}</div>
                </div>
                <div className="right flex justify-between gap-2">
                    {isPresent && <p className="text-green-600 font-bold border-2 border-green-500 p-2 rounded-md hover:bg-green-600 hover:text-white">Present</p>}
                    {!isPresent && <p className="text-red-700 font-bold border-2 border-red-600 p-2 rounded-md hover:bg-red-700 hover:text-white">Absent</p>}
                </div>
            </div>
        </>
    )
}

export default AttendanceSheet