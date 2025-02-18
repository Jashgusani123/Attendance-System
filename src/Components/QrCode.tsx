import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";




const QrCode = () => {
    const location = useLocation();
    const { classDetails, students } = location.state || {};
    const [QR, setQR] = useState()
    useEffect(() => {
        const fetchQRCode = async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/teacher/generate-qr`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    classDetails, students
                }),
            });
            const data = await response.json();
            if(data.success){
                setQR(data.qrCode)
            }
        }

        fetchQRCode()
    }, [])
    return (
        <>
            <img src={`${QR}`} alt="" />
        </>
    )
}

export default QrCode