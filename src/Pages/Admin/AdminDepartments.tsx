import DepartmentCard from "../../Components/Admin/DepartmentsCard";
import { useGetAllDepartmentsQuery } from "../../Redux/API/Admin";
import { Capitalize } from "../../Utils/toCapitalize";

  
const AdminDepartment = () => {
    const {data:collegeData} = useGetAllDepartmentsQuery()

    return (
      <div className="p-4 flex flex-col gap-8">
        {collegeData? collegeData.data.map((college, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-blue-800">{Capitalize(college.collegeName)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {college.departments.map((dept, i) => (
                <DepartmentCard key={i} dept={dept} />
              ))}
            </div>
          </div>
        )):<p>Not Avaiabel</p>}
      </div>
    );
  };
  
  export default AdminDepartment;
  