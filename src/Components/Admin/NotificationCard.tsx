const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const NotificationCard = ({ note, onDelete }: { note: any; onDelete: () => void }) => {
  const isExpired = new Date(note.expiry) < new Date();

  return (
    <div className="relative pl-4 border-l-2 border-blue-300 bg-white p-4 rounded shadow">
      <div className="absolute -left-2 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>

      <p className="text-md font-medium text-zinc-700">{note.message}</p>
      <p className="text-xs text-zinc-500 mt-1">📍 To: <span className="font-semibold">{note.target === "user" ? note.user : note.target === "college" ? `${note.role}s of ${note.college}` : "All Users"}</span></p>
      <p className="text-xs text-zinc-500">⏳ Expires: <span className="font-semibold">{formatDate(note.expiry)}</span></p>

      <div className="flex justify-between items-center mt-2 text-xs">
        <span className={`font-semibold px-2 py-1 rounded ${isExpired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {isExpired ? "Expired" : "Active"}
        </span>
        <span className={`font-semibold px-2 py-1 rounded ${note.read ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
          {note.read ? "Read" : "Unread"}
        </span>
        <button onClick={onDelete} className="text-red-600 hover:underline">❌ Delete</button>
      </div>
    </div>
  );
};
export default NotificationCard;