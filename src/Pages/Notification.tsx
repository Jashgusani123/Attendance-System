import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";




const Notification = ({ fun, notifications }: { fun: any, notifications: any }) => {
    const [expandedNotification, setExpandedNotification] = useState<string | null>(null);

    const toggledescription = (id: string) => {
        setExpandedNotification((prev) => (prev === id ? null : id));
    };

    

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="absolute lg:top-16 lg:right-4 top-28 right-[-30px] bg-white text-blue-900 shadow-xl rounded-lg lg:w-96 w-[300px] p-4 z-50 pointer-events-none"
        >
            <div className="flex justify-between items-center border-b pb-2 pointer-events-auto">
                <h3 className="text-lg font-bold">Notifications</h3>
                <X className="cursor-pointer" onClick={() => fun(false)} />
            </div>
            <ul className="mt-2 space-y-2 pointer-events-auto">
                {notifications.map((notification: any) => (
                    <li key={notification._id} className="bg-gray-100 p-2 rounded-md text-sm shadow-sm">
                        <div className="flex justify-between items-center">
                            <span>{notification.upperHeadding}</span>
                            {notification.description && (
                                <ChevronDown
                                    className={`w-5 h-5 cursor-pointer transition-transform ${expandedNotification === notification._id ? "rotate-180" : ""
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggledescription(notification._id);
                                    }}
                                />
                            )}
                        </div>
                        {expandedNotification === notification._id && (
                            <p className="mt-2 text-gray-700 text-xs bg-white p-2 rounded-md shadow-sm">
                                {notification.description.split("\n").map((line: any, index: any) => (
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
