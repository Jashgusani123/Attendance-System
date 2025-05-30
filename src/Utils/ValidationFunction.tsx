import FingerprintJS from "@fingerprintjs/fingerprintjs";
import socket from "../Components/Socket";
import { Capitalize } from "./toCapitalize";

//Detect Incognito Mode
async function isIncognito(): Promise<boolean> {
    return new Promise((resolve) => {
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(({ quota }) => {

                if (quota && quota < 1_000_000_000) { // Less than 1GB (Incognito)
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(() => resolve(false));
        } else {
            resolve(false);
        }
    });
}


// Device ID By FingerprintJS
async function getDeviceId() {
    try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId; // Unique fingerprint ID
    } catch (error) {
        console.error("Error generating Device ID:", error);
        return null;
    }
}


//  Get stored attendance records (per class)
function getApprovedClasses(): Record<string, Set<string>> {
    const savedData = localStorage.getItem("approvedClasses");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((key) => {
            parsedData[key] = new Set(parsedData[key]);
        });
        return parsedData;
    }
    return {};
}

// Save attendance approval for a specific class
function saveApprovedClassAttendance(classId: string, deviceId: string) {
    const approvedClasses = getApprovedClasses();
    
    if (!approvedClasses[classId]) {
        approvedClasses[classId] = new Set();
    }

    approvedClasses[classId].add(deviceId);

    // Convert Sets back to arrays before storing in localStorage
    const convertedData = Object.fromEntries(
        Object.entries(approvedClasses).map(([key, value]) => [key, Array.from(value)])
    );

    localStorage.setItem("approvedClasses", JSON.stringify(convertedData));
}

// Submit Attendance
export async function submitAttendance(
    studentId: string,
    classId: string,  
    setIsIncognito: React.Dispatch<React.SetStateAction<boolean>>
): Promise<boolean> {
    const incognito = await isIncognito();

    if (incognito) {
        alert("Attendance approval is blocked in Incognito Mode.");
        setIsIncognito(true);
        return false;
    }

    const deviceId = await getDeviceId();
    if (!deviceId) {
        console.warn("Unable to fetch device ID.");
        return false;
    }


    // Get stored attendance records for each class
    const approvedClasses = getApprovedClasses();

    // 🚨 Validation: Reject if attendance is already approved for this class
    if (approvedClasses[classId]?.has(deviceId)) {
        alert("Attendance already approved for this class.");
        return false;
    }
    
    // store the device for this class in localStorage
    saveApprovedClassAttendance(classId, deviceId);

    const response = await fetch(`${import.meta.env.VITE_SERVER}/class/accept` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({classID:classId , StudentErNo:studentId })
    })
    const data = await response.json();
    if(data.success){
        socket.emit("attendance_approved" , `Your Attendance Will be ${data.data.isPresent ? "Approve ✅" : "Reject ❌"}, For...` ,`Your Attendance Will be ${data.data.isPresent ? "Approve ✅" : "Reject ❌"}, For The ${Capitalize(data.data.subjectName)} Class \n Teacher :- ${Capitalize(data.data.teacherName)}`)
    }else{
        alert(data.message)
    }
    setIsIncognito(false);
    return true;
}