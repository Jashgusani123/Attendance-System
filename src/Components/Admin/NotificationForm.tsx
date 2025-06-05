import { useEffect, useState } from "react";
import { Capitalize } from "../../Utils/toCapitalize";

const roles = ["All","Students", "Teachers", "HODs" ];

const NotificationForm = ({ onSend }: { onSend: (data: any) => void }) => {
  const [target, setTarget] = useState("All");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");

  const [collegeList, setCollegeList] = useState<string[]>([]);
  const [departmentList, setDepartmentList] = useState<string[]>([]);
  const [userList, setUserList] = useState<{ label: string; value: string }[]>([]); // assuming you’ll fetch IDs

  const [upperHeading, setUpperHeading] = useState("");
  const [description, setDescription] = useState("");

  const inputStyle =
    "w-full border border-blue-300 bg-blue-50 text-blue-900 placeholder:text-blue-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  useEffect(() => {
    const fetchColleges = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/supported/getallcollege`);
      const data = await res.json();
      if (data.success) setCollegeList(data.collegeNames || []);
    };
    fetchColleges();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      if (!college || !department) return;
  
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/admin/getnames`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collegeName: college,
          departmentName: department.toLowerCase(),
        }),
      });
  
      const data = await res.json();
      if (data.success) {
        const formattedUsers = data.users.map((u: any) => ({
          label: u.fullName ,
          value: u._id,
        }));
        setUserList(formattedUsers);
      }
    };
  
    fetchUsers();
  }, [college, department]);
  
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!college) return;
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/supported/getalldepartment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeName: college }),
      });
      const data = await res.json();
      if (data.success) setDepartmentList(data.departmentNames || []);
    };
    fetchDepartments();
  }, [college]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let toValue = "All";
    if (target === "user") {
      toValue = user;
    } else if (target === "college") {
      if (!college || !role) {
        alert("Please select college and role.");
        return;
      }
      toValue = `${college}-${role}`;
    }
    

    onSend({
      upperHeading,
      description,
      to: toValue,
      target,
      college,
      department,
      status: "Active",
      read: false,
      createdAt: new Date().toISOString(),
    });

    setUpperHeading("");
    setDescription("");
    setUser("");
    setCollege("");
    setRole("");
    setDepartment("");
    setTarget("all");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-[#ffb900] to-[#1c398e] border border-blue-200 p-6 rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
        📬 Send Notification
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Enter heading..."
            className={inputStyle}
            value={upperHeading}
            onChange={(e) => setUpperHeading(e.target.value)}
            required
          />
        </div>
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Enter description..."
            className={inputStyle}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Send To:</label>
          <select className={inputStyle} value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="all">All Users</option>
            <option value="user">Specific User</option>
            <option value="college">College</option>
          </select>
        </div>

        {target === "user" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Select User:</label>
              <select className={inputStyle} value={user} onChange={(e) => setUser(e.target.value)} required>
                <option value="">Select User</option>
                {userList.map((u) => (
                  <option key={u.value} value={u.value}>
                    {Capitalize(u.label)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select College:</label>
              <select className={inputStyle} value={college} onChange={(e) => setCollege(e.target.value)} required>
                <option value="">Select College</option>
                {collegeList.map((c) => (
                  <option key={c} value={c}>
                    {Capitalize(c)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Department:</label>
              <select className={inputStyle} value={department} onChange={(e) => setDepartment(e.target.value)} required>
                <option value="">Select Department</option>
                {departmentList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {target === "college" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Select College:</label>
              <select className={inputStyle} value={college} onChange={(e) => setCollege(e.target.value)} required>
                <option value="">Select College</option>
                {collegeList.map((c) => (
                  <option key={c} value={c}>
                    {Capitalize(c)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Role:</label>
              <select className={inputStyle} value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
      >
        Send Notification
      </button>
    </form>
  );
};

export default NotificationForm;
