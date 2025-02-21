import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const QrCode = () => {
    const location = useLocation();
    const { classDetails, students, classID, socketIDs } = location.state || {};
    const [QR, setQR] = useState(null);

    useEffect(() => {
        const fetchQRCode = async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/teacher/generate-qr`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ classDetails, students, classID, socketIDs }),
            });
            const data = await response.json();
            if (data.success) {
                setQR(data.qrCode);
            }
        };

        fetchQRCode();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <a href="/teacher/dashboard" className="absolute top-6 left-6 text-white text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="white">
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
            </a>
            {QR && (
                <img src={QR} alt="QR Code" className="p-4 bg-white rounded-lg shadow-lg" />
            )}
        </div>
    );
};

export default QrCode;
