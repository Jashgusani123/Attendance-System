import DepartmentCard from "../../Components/Admin/DepartmentsCard";
const collegeData = [
    {
      name: "Greenfield Institute",
      departments: [
        { name: "Computer Science", hod: "Dr. Alan Smith" },
        { name: "Mechanical Engineering", hod: "Dr. Rosa Lee" },
      ],
    },
    {
      name: "National Tech College",
      departments: [
        { name: "Electronics", hod: "Dr. Sanjay Mehra" },
        { name: "Business Administration", hod: "Ms. Rita Roy" },
      ],
    },
  ];
  
const AdminDepartment = () => {
    return (
      <div className="p-4 flex flex-col gap-8">
        {collegeData.map((college, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-blue-800">{college.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {college.departments.map((dept, i) => (
                <DepartmentCard key={i} dept={dept} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default AdminDepartment;
  