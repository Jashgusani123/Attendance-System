import { useState } from "react";
import { useSignupMutation } from "../Redux/API/Student";
import { StudentRequest } from "../Types/API/StudentApiType";

const SignUp = () => {
  const [role, setRole] = useState("student");
  
  const [signup , {isLoading , isError , data}] = useSignupMutation();

  const [formData, setFormData] = useState<StudentRequest>({
    fullName: "",
    collegeJoiningDate:new Date(),
    departmentName: "",
    collegeName: "",
    email: "",
    enrollmentNumber: "",
    password: "",
    semester: 1,
  });
  const handleSubmite = ()=>{

  }
  const handleChange = (e:any)=>{
    console.log(e);
    
    // setFormData({e.name:e.innerText})
  }
  return (
    <div className=" flex items-center justify-centerp-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Signup Form</h2>
        
        <label className="block font-semibold text-gray-700 mb-2">Select Role:</label>
        <select 
          className="w-full p-2 mb-4 border rounded-md text-blue-700 font-semibold focus:ring-2 focus:ring-blue-400"
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        
        <form className="space-y-4" onSubmit={handleSubmite}>
          {/* Common Name Field */}
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" 
            required 
          />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" required onC/>
          <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" required />
          {/* Student Fields */}
          {role === "student" && (
            <>
              <input type="text" placeholder="College Name" className="w-full p-2 border rounded-md" required />
              <input type="text" placeholder="Enrollment Number" className="w-full p-2 border rounded-md" required />
              <input type="text" placeholder="Department Name" className="w-full p-2 border rounded-md" required />
              <input type="text" placeholder="Semester" className="w-full p-2 border rounded-md" required />
              <label>College Joining Date</label>
              <input type="date" placeholder="College Joining Date" className="w-full p-2 border rounded-md" required />
            </>
          )}
          
          {/* Teacher Fields */}
          {role === "teacher" && (
            <>
              <label className="block font-semibold text-gray-700">Department:</label>
              
              <select className="w-full p-2 border rounded-md text-blue-700 font-semibold">
                <option value="civil">Civil</option>
                <option value="computer">Computer</option>
                <option value="mechanical">Mechanical</option>
                <option value="electrical">Electrical</option>
              </select>
            </>
          )}
          
          {/* Admin Fields */}
          {/* {role === "admin" && (
            
          )} */}
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded-md font-bold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
