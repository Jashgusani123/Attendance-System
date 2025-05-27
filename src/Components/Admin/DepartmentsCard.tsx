import { School, User } from "lucide-react"; // Optional icons

const DepartmentCard = ({ dept }: { dept: any }) => (
  <div className="bg-white border border-zinc-200 shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
        <School className="h-5 w-5 text-blue-700" />
        {dept.name}
      </h3>
    </div>
    <p className="text-sm text-zinc-600 flex items-center gap-1">
      <User className="h-4 w-4 text-zinc-500" />
      <span>HOD: {dept.hod}</span>
    </p>
    {/* Optional Footer Actions */}
    {/* <div className="mt-2 flex gap-2">
      <button className="text-sm text-blue-600 underline">View</button>
      <button className="text-sm text-rose-600 underline">Delete</button>
    </div> */}
  </div>
);
export default DepartmentCard;
