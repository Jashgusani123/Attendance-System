const NotificationCard = ({ note, onDelete }: { note: any; onDelete: () => void }) => {
    const isExpired = new Date(note.expiry) < new Date();
  
    return (
      <div className="border rounded-xl p-4 bg-white shadow flex flex-col gap-2">
        <p className="text-sm">{note.message}</p>
        <p className="text-xs text-zinc-500">To: {note.target === "user" ? note.user : note.target === "college" ? `${note.role}s of ${note.college}` : "All Users"}</p>
        <p className="text-xs text-zinc-500">Expires: {note.expiry}</p>
  
        <div className="flex justify-between items-center mt-2">
          <span className={`text-xs font-bold px-2 py-1 rounded ${isExpired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {isExpired ? "Expired" : "Active"}
          </span>
          <span className={`text-xs font-bold px-2 py-1 rounded ${note.read ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
            {note.read ? "Read" : "Unread"}
          </span>
          <button onClick={onDelete} className="text-red-600 text-sm hover:underline">
            Delete
          </button>
        </div>
      </div>
    );
  };
  export default NotificationCard