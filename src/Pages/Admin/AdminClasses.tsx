import InnerNavbar from "../../Components/Admin/InnerNavbar";
import { useGetAllClassesQuery } from "../../Redux/API/Admin";
import { Capitalize } from "../../Utils/toCapitalize";

const ClassCard = ({ classInfo }: { classInfo: any }) => (
  <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border border-zinc-200">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-blue-900">{Capitalize(classInfo.title)}</h3>
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
      <span className="font-semibold text-zinc-900">College:</span> {Capitalize(classInfo.college)}
    </p>
    <p className="text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">Department:</span> {Capitalize(classInfo.department)}
    </p>
    <p className="text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">Teacher:</span> {Capitalize(classInfo.teacher)}
    </p>
    <p className="text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">Time:</span> {classInfo.time}
    </p>
  </div>
);

const AdminClasses = () => {

  const {data:Classes} =useGetAllClassesQuery();
  return (
    <div className="p-4">
      <InnerNavbar Name="All Classes" />

      {/* Live Classes */}
      <section className="mt-4">
        <h2 className="text-xl font-bold text-blue-900 mb-2">🔴 Live Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Classes?.data.liveClasses&&Classes?.data.liveClasses.length > 0) ? Classes?.data.liveClasses.map((cls, idx) => (
            <ClassCard key={idx} classInfo={cls} />
          )):<p className="text-zinc-500 px-8">Not Available</p>}
        </div>
      </section>

      {/* Last Classes */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-blue-900 mb-2">📚 Last Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Classes?.data.lastClasses&&Classes?.data.lastClasses.length > 0) ? Classes?.data.lastClasses.map((cls, idx) => (
            <ClassCard key={idx} classInfo={cls} />
          )):<p className="text-zinc-500 px-8">Not Available</p>}
        </div>
      </section>
    </div>
  );
};

export default AdminClasses;
