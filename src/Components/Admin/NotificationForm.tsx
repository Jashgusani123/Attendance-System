import { useState } from "react";

const roles = ["Student", "Teacher", "HOD"];
const colleges = ["Greenfield Institute", "National Tech College"];
const users = ["user1@example.com", "user2@example.com"]; // This would come from backend ideally

const NotificationForm = ({ onSend }: { onSend: (data: any) => void }) => {
  const [target, setTarget] = useState("all");
  const [college, setCollege] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSend({
      message,
      target,
      college,
      role,
      user,
      expiry,
      status: "Active",
      read: false,
      createdAt: new Date().toISOString(),
    });

    setMessage("");
    setExpiry("");
    setUser("");
    setCollege("");
    setRole("");
    setTarget("all");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow flex flex-col gap-3">
      <h2 className="text-xl font-bold text-blue-900">📨 Send Notification</h2>

      <textarea
        placeholder="Type your message..."
        className="border p-2 rounded w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <label className="text-sm font-semibold">Send To:</label>
      <select className="border p-2 rounded" value={target} onChange={(e) => setTarget(e.target.value)}>
        <option value="all">All Users</option>
        <option value="user">Specific User</option>
        <option value="college">College</option>
      </select>

      {target === "user" && (
        <select className="border p-2 rounded" value={user} onChange={(e) => setUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      )}

      {target === "college" && (
        <>
          <select className="border p-2 rounded" value={college} onChange={(e) => setCollege(e.target.value)} required>
            <option value="">Select College</option>
            {colleges.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select className="border p-2 rounded" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </>
      )}

      <label className="text-sm font-semibold">Expiry Date:</label>
      <input
        type="date"
        className="border p-2 rounded"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Send Notification
      </button>
    </form>
  );
};
export default NotificationForm