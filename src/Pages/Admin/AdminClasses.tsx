import InnerNavbar from "../../Components/Admin/InnerNavbar";

const liveClasses = [
  {
    title: "Data Structures - CS101",
    college: "Greenfield Institute of Technology",
    department: "Computer Science",
    teacher: "Prof. John Doe",
    time: "10:00 AM - 11:00 AM",
    status: "Live Now",
  },
  {
    title: "Digital Marketing - BBA202",
    college: "Global Business School",
    department: "Business Administration",
    teacher: "Ms. Jane Smith",
    time: "10:30 AM - 11:30 AM",
    status: "Live Now",
  },
];

const lastClasses = [
  {
    title: "Operating Systems - CS201",
    college: "Greenfield Institute of Technology",
    department: "Computer Science",
    teacher: "Dr. Lisa Ray",
    time: "Yesterday 3:00 PM",
    status: "Completed",
  },
  {
    title: "Economics - ECO101",
    college: "National Economics College",
    department: "Economics",
    teacher: "Mr. Paul James",
    time: "Yesterday 1:00 PM",
    status: "Completed",
  },
];

const ClassCard = ({ classInfo }: { classInfo: any }) => (
  <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border border-zinc-200">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-blue-900">{classInfo.title}</h3>
      <span
        className={`text-xs font-semibold px-2 py-1 rounded ${
          classInfo.status === "Live Now"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {classInfo.status}
      </span>
    </div>
    <p className="text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">College:</span> {classInfo.college}
    </p>
    <p className="text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">Department:</span> {classInfo.department}
    </p>
    <p className="text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">Teacher:</span> {classInfo.teacher}
    </p>
    <p className="text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">Time:</span> {classInfo.time}
    </p>
  </div>
);

const AdminClasses = () => {
  return (
    <div className="p-4">
      <InnerNavbar Name="All Classes" />

      {/* Live Classes */}
      <section className="mt-4">
        <h2 className="text-xl font-bold text-blue-900 mb-2">🔴 Live Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveClasses.map((cls, idx) => (
            <ClassCard key={idx} classInfo={cls} />
          ))}
        </div>
      </section>

      {/* Last Classes */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-blue-900 mb-2">📚 Last Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lastClasses.map((cls, idx) => (
            <ClassCard key={idx} classInfo={cls} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminClasses;
