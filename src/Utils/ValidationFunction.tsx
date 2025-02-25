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

// ✅ Function to Submit Attendance
export async function submitAttendance(studentId: number , setIsIncognito:React.Dispatch<React.SetStateAction<boolean>>): Promise<boolean> {
    const incognito = await isIncognito();
    
    if (incognito) {
        // console.warn("Attendance approval is blocked in Incognito Mode.");
        alert("Attendance approval is blocked in Incognito Mode.")
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

    const approvedDevices = getApprovedDevices();

    // 🚨 Validation: Reject if the device is already used
    if (approvedDevices.has(deviceId)) {
        console.warn("Attendance already approved on this device.");
    setIsIncognito(false)

        return false;
    }

    // ✅ If valid, store the device in approved list
    saveApprovedDevice(deviceId);
    console.log(`✅ Attendance approved for Student ID: ${studentId}, Device: ${deviceId}, IP: ${ipAddress}`);
    setIsIncognito(true)
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
