import FingerprintJS from "@fingerprintjs/fingerprintjs";

// ✅ Improved Function to Detect Incognito Mode
async function isIncognito(): Promise<boolean> {
    return new Promise((resolve) => {
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(({ quota }) => {
                console.log("Storage Quota:", quota); // Debugging

                if (quota && quota < 1_000_000_000) { // 🔥 Less than 1GB (Incognito)
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


// ✅ Function to Get Unique Device ID
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

// ✅ Function to Get User IP Address
async function getIpAddress() {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP:", error);
        return null;
    }
}

// ✅ Approved Devices (Using Local Storage for Better Tracking)
function getApprovedDevices(): Set<string> {
    const savedDevices = localStorage.getItem("approvedDevices");
    return savedDevices ? new Set(JSON.parse(savedDevices)) : new Set();
}

function saveApprovedDevice(deviceId: string) {
    const approvedDevices = getApprovedDevices();
    approvedDevices.add(deviceId);
    localStorage.setItem("approvedDevices", JSON.stringify([...approvedDevices]));
}

// ✅ Get stored attendance records (per class)
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

// ✅ Save attendance approval for a specific class
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

// ✅ Function to Submit Attendance
export async function submitAttendance(
    studentId: string,
    classId: string,  // ✅ Pass class ID to track attendance per class
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

    const ipAddress = await getIpAddress();
    if (!ipAddress) {
        console.warn("Unable to fetch IP Address.");
        return false;
    }

    // ✅ Get stored attendance records for each class
    const approvedClasses = getApprovedClasses();

    // 🚨 Validation: Reject if attendance is already approved for this class
    if (approvedClasses[classId]?.has(deviceId)) {
        alert("Attendance already approved for this class.");
        return false;
    }
    
    // ✅ If valid, store the device for this class in localStorage
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
        console.log(`✅ Attendance approved for Student ID: ${studentId}, Class ID: ${classId}, Device: ${deviceId}, IP: ${ipAddress}`);
    }else{
        alert(data.message)
    }
    setIsIncognito(false);
    return true;
}


// ✅ Example: Call the function when submitting attendance
// document.getElementById("approveAttendanceBtn")?.addEventListener("click", async () => {
//     const studentId = localStorage.getItem("studentId"); // Example storage for student ID
//     if (studentId) {
//         await submitAttendance(parseInt(studentId));
//     } else {
//         console.warn("No Student ID found.");
//     }
// });
