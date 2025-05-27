import { useState } from "react";
import NotificationForm from "../../Components/Admin/NotificationForm";
import NotificationCard from "../../Components/Admin/NotificationCard";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleSend = (data: any) => {
    setNotifications((prev) => [...prev, { id: Date.now(), ...data }]);
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <NotificationForm onSend={handleSend} />

      <div>
        <h2 className="text-xl font-bold text-blue-900 mb-3">🗂 Sent Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notifications.map((note) => (
            <NotificationCard key={note.id} note={note} onDelete={() => handleDelete(note.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
