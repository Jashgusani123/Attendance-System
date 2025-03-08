import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion

const Notification = ({ fun }: { fun: any }) => {
    const [expandedNotification, setExpandedNotification] = useState<number | null>(null);

    const notifications = [
        { id: 1, message: "Welcome to QuickAttend Website. Hello, Jash!!", details: "Enjoy a seamless experience with QuickAttend. Track attendance easily!" },
        { id: 2, message: "Your Attendance Will be Approve ✅, For...", details: "Your Attendance Will be Approve ✅, For The Software Engineering :- 4340702\nTeacher :- Jash Gusani" },
        { id: 3, message: "Your Attendance Will be Reject ❌, For...", details: "Your Attendance Will be Reject ❌, For The Web Development Subject :- 4340704\nTeacher :- Jash Gusani" },
    ];

    const toggleDetails = (id: number) => {
        setExpandedNotification((prev) => (prev === id ? null : id));
    };

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}  // Start position (off-screen)
            animate={{ x: 0, opacity: 1 }}    // Final position (on-screen)
            exit={{ x: 300, opacity: 0 }}     // Exit position (off-screen)
            transition={{ type: "spring", stiffness: 100 }} // Smooth animation
            className="absolute top-16 right-4 bg-white text-blue-900 shadow-xl rounded-lg w-96 p-4 z-50"
        >
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-bold">Notifications</h3>
                <X className="cursor-pointer" onClick={() => fun(false)} />
            </div>
            <ul className="mt-2 space-y-2">
                {notifications.map((notification) => (
                    <li key={notification.id} className="bg-gray-100 p-2 rounded-md text-sm shadow-sm">
                        <div className="flex justify-between items-center">
                            <span>{notification.message}</span>
                            {notification.details && (
                                <ChevronDown
                                    className={`w-5 h-5 cursor-pointer transition-transform ${
                                        expandedNotification === notification.id ? "rotate-180" : ""
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDetails(notification.id);
                                    }}
                                />
                            )}
                        </div>
                        {expandedNotification === notification.id && (
                            <p className="mt-2 text-gray-700 text-xs bg-white p-2 rounded-md shadow-sm">
                                {notification.details.split("\n").map((line, index) => (
                                    <span key={index}>{line}<br /></span>
                                ))}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Notification;
