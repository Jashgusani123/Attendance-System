import NotificationCard from "../../Components/Admin/NotificationCard";
import NotificationForm from "../../Components/Admin/NotificationForm";
import { useDeleteNotificationMutation, useGetAllNotificationsQuery, useNotificationMutation } from "../../Redux/API/Admin";

const AdminNotifications = () => {
  const {data:Notifications} = useGetAllNotificationsQuery();
  const [NotificationCreatation] = useNotificationMutation();
  const [NotificationDeletation] = useDeleteNotificationMutation();
  const handleSend = (data: {
    upperHeading: string,
    description: string,
    target: string,
    college: string,
    role: string,
    user: string,
    department: string,
    status: string,
    read: string,
    createdAt: Date,
    to:string
  }) => {

    if(data.target === "all"){
      NotificationCreatation({upperHeadding:data.upperHeading,description:data.description , to:data.target , type:"adminmessage"})
    }else if(data.target ==="college"){
      NotificationCreatation({upperHeadding:data.upperHeading,description:data.description , to:data.to , type:"adminmessage"})
    }else{
      NotificationCreatation({upperHeadding:data.upperHeading,description:data.description , to:data.to , type:"adminmessage"})
    }

  };

  const handleDelete = async(id: string) => {
    NotificationDeletation(id);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <NotificationForm onSend={handleSend} />

      <div>
        <h2 className="text-xl font-bold text-blue-900 mb-3">🗂 Sent Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Notifications?.Notifications.map((note) => (
            <NotificationCard key={note._id} note={note} onDelete={() => handleDelete(note._id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;