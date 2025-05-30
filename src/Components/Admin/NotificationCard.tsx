type Note = {
  _id: string;
  upperHeadding: string;
  description: string;
  allUsers: string[];
  to: string;
  userType: string;
};

const formatDate = (iso?: string) => {
  if (!iso) return "No Expiry";
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const NotificationCard = ({ note, onDelete }: { note: Note; onDelete: () => void }) => {
  return (
    <div className="relative border-l-4 border-blue-500 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Blue dot */}
      <div className="absolute -left-2 top-4 w-3 h-3 bg-blue-500 rounded-full"></div>

      {/* Heading */}
      <h3 className="text-lg font-semibold text-zinc-800">{note.upperHeadding}</h3>

      {/* Description */}
      <p className="text-sm text-zinc-600 mt-1">{note.description}</p>

      {/* Target Info */}
      <p className="text-xs text-zinc-500 mt-2">
        📍 <span className="font-semibold">To:</span> {note.to === "all" ? "All Users" : `${note.userType}s (${note.allUsers.length} users)`}
      </p>

      {/* Expiry – optional */}
      <p className="text-xs text-zinc-500">
        ⏳ <span className="font-semibold">Expires:</span> {formatDate()}
      </p>

      {/* Footer – Delete */}
      <div className="flex justify-between items-center mt-3 text-xs">
        <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded">
          Active
        </span>
        <button onClick={onDelete} className="font-semibold text-red-600 hover:bg-red-200 hover:text-white p-2 transition-all delay-75 rounded-2xl">
          ❌ Delete
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
