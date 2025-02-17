import { useState } from "react";
import { StudentRequestForLogin } from "../Types/API/StudentApiType";
import { useLoginMutation as StudentLoginMutation } from "../Redux/API/Student";
import { useLoginMutation as TeacherLoginMutation } from "../Redux/API/Teacher";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { studentExits, studentNotExits } from "../Redux/slices/StudentSlices";
import { teacherExits, teacherNotExits } from "../Redux/slices/TeacherSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [role, setRole] = useState("student");
  const [studentLogin] = StudentLoginMutation();
  const [teacherLogin] = TeacherLoginMutation();

  const [formData, setFormData] = useState<StudentRequestForLogin>({
    fullName: "",
    email: "",
    enrollmentNumber: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      let res;
  
      // Check role and call the respective login API
      if (role === "student") {
        res = await studentLogin(formData);
        
        if (res && "data" in res && res.data?.success) {
          // Dispatch action to store student info in Redux
          dispatch(teacherNotExits())

          dispatch(studentExits(res.data?.user));
        } else {
          // Handle login failure
          console.error("Login failed: ", res?.data?.message || "Unknown error");
        }
      } else if (role === "teacher") {
        
        res = await teacherLogin({fullName:formData.fullName , email:formData.email , password:formData.password });
        // console.log(res.data , role);
        
        if (res && "data" in res && res.data?.success) {
          // Dispatch action to store teacher info in Redux
          dispatch(studentNotExits())
          dispatch(teacherExits(res.data?.user));
        } else {
          // Handle login failure
          console.error("Login failed: ", res?.data?.message || "Unknown error");
        }
      }
      
  
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center overflow-hidden p-6 h-full">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Login Form</h2>
        
        {/* Role Selection */}
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
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Common Name Field */}
          {role !== "admin" && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" 
              required 
              onChange={handleChange}
              name="fullName"
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border rounded-md" 
            required 
            onChange={handleChange}
            name="email"

          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border rounded-md" 
            required 
            onChange={handleChange}
            name="password"

          />
          
          {/* Student Fields */}
          {role === "student" && (
            <>
              <input 
                type="text" 
                placeholder="Enrollment Number" 
                className="w-full p-2 border rounded-md" 
                required 
              onChange={handleChange}
              name="enrollmentNumber"

              />
            </>
          )}
          
          {/* Teacher Fields */}
          {role === "teacher" && (
            <></>
          )}
          
          {/* Admin Fields */}
          {role === "admin" && (
            <input 
              type="password" 
              placeholder="Secret Key" 
              className="w-full p-2 border rounded-md" 
              required 
            />
          )}
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded-md font-bold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
