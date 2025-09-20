import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { useSendmessageMutation } from "../Redux/API/Teacher";
import { useAcceptPandingReuestMutation, useRejectPandingReuestMutation } from "../Redux/API/Panding";
import { Capitalize } from "../Utils/toCapitalize";




const Notification = ({ fun, notifications, type }: { fun: any, notifications: any, type?: string }) => {
    const [expandedNotification, setExpandedNotification] = useState<string | null>(null);
    const [input, setinput] = useState("");
    const [sentMessages, setSentMessages] = useState<{ [key: string]: boolean }>({});
    const [text, settext] = useState("")
    const [sendMessage] = useSendmessageMutation();
    const [AcceptPandingRequest] = useAcceptPandingReuestMutation();
    const [RejectPandingRequest] = useRejectPandingReuestMutation();

    const toggledescription = (id: string) => {
        setExpandedNotification((prev) => (prev === id ? null : id));
    };

    const sendMessageFunc = async (id: string) => {
        const response = await sendMessage({ message: input });
        if (response && "data" in response && response.data.success) {
            setSentMessages((prev) => ({ ...prev, [id]: true })); // Mark only this notification as sent
        }
        setinput("");
    };

    const acceptRequestFunc = async (pandingId: string, _id: string) => {

        const response = await AcceptPandingRequest({ pandingId, _id });
        if (response && "data" in response && response.data.success) {
            settext(response.data.message)
        }
    }
    const rejectRequestFunc = async (pandingId: string, _id: string) => {

        const response = await RejectPandingRequest({ pandingId, _id });
        if (response && "data" in response && response.data.success) {
            settext(response.data.message)
        }
    }

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="absolute lg:top-16 lg:right-4 top-28 right-[-30px] bg-white text-blue-900 shadow-xl rounded-lg lg:w-96 w-[300px] p-4 z-50 "
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="flex justify-between items-center border-b pb-2 pointer-events-auto">
                <h3 className="text-lg font-bold">Notifications</h3>
                <X className="cursor-pointer" onClick={() => fun(false)} />
            </div>
            <ul className="mt-2 space-y-2 ">
                {notifications.map((notification: any) => (
                    <li key={notification._id} className="bg-gray-100 p-2 rounded-md text-sm shadow-sm">
                        <div className="flex justify-between items-center">
                            <span>{notification.upperHeadding}</span>
                            {notification.description && (
                                <ChevronDown
                                    className={`w-5 h-5  transition-transform ${expandedNotification === notification._id ? "rotate-180" : ""
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
                                {notification.type === "message" && type === "Teacher" && (
                                    <div className="message_sending_container flex flex-wrap items-baseline justify-around flex-row w-full">
                                        {!sentMessages[notification._id] && (
                                            <input
                                                type="text"
                                                placeholder="send message.."
                                                className="mt-2 w-[70%] text-gray-700 text-xs h-7 bg-white p-2 rounded-md shadow-sm"
                                                onChange={(e) => setinput(e.target.value)}
                                            />
                                        )}
                                        {!sentMessages[notification._id] ? (
                                            <button className="bg-blue-400 text-white rounded-2xl h-7 w-[20%]" onClick={() => sendMessageFunc(notification._id)}>
                                                Send
                                            </button>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF">
                                                <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
                                            </svg>
                                        )}
                                    </div>
                                )}
                                {notification.type === "request" && type === "Hod" && (
                                    <div className="flex flex-wrap gap-2 justify-center flex-row">
                                        {text ? <p className="text-[#a39e9e] ">{Capitalize(text)}</p> : <><button className="bg-green-800 mt-1 text-white rounded-xl h-7 w-[20%] cursor-pointer" onClick={() => acceptRequestFunc(notification.pandingId, notification._id)}>
                                            Accept
                                        </button>
                                            <button className="bg-red-800 mt-1 text-white rounded-xl h-7 w-[20%] cursor-pointer" onClick={() => rejectRequestFunc(notification.pandingId, notification._id)}>
                                                Reject
                                            </button></>}
                                    </div>
                                )}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>

    );
};

export default Notification;
