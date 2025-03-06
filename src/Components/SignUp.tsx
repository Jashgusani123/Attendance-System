import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignupMutation as StudentSignupMution } from "../Redux/API/Student";
import { useSignupMutation as TeacherSignupMution } from "../Redux/API/Teacher";
import { studentExits } from "../Redux/slices/StudentSlices";
import { teacherExits } from "../Redux/slices/TeacherSlice";
import { StudentRequest } from "../Types/API/StudentApiType";

const SignUp = () => {
  const dispatch = useDispatch();
  
  const [role, setRole] = useState("student");

  const [StudentSignup] = StudentSignupMution();
  const [TeacherSignup] = TeacherSignupMution();
  const [loading, setloading] = useState(false)

  const [formData, setFormData] = useState<StudentRequest>({
    fullName: "",
    collegeJoiningDate: "", // Changed to empty string for proper handling
    departmentName: "",
    collegeName: "",
    email: "",
    enrollmentNumber: "",
    password: "",
    semester: 1,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);

    try {
      let res;
      
      if (role === "student") {
        res = await StudentSignup(formData);
        if (res && "data" in res && res.data?.success) {
          const userData = res.data?.user;
          dispatch(studentExits(userData));
        }
       
      } else {
        res = await TeacherSignup(formData);
        if (res && "data" in res && res.data?.success) {
          const userData = res.data?.user;
          dispatch(teacherExits(userData));
        }

      }
    } catch (error) {
      console.error("Signup Error:", error);
    } finally{
      setloading(false);
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
    <div className="flex items-center justify-center p-6">
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

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Common Name Field */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
            name="fullName"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            required
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            required
            name="password"
            onChange={handleChange}
          />
          <input
                type="text"
                placeholder="College Name"
                className="w-full p-2 border rounded-md"
                required
                name="collegeName"
                onChange={handleChange}
              />

          {/* Student Fields */}
          {role === "student" && (
            <>
              
              <input
                type="text"
                placeholder="Enrollment Number"
                className="w-full p-2 border rounded-md"
                required
                name="enrollmentNumber"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Department Name"
                className="w-full p-2 border rounded-md"
                required
                name="departmentName"
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Semester"
                className="w-full p-2 border rounded-md"
                required
                name="semester"
                min="1"
                max="8"
                onChange={handleChange}
              />
              <label>College Joining Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                required
                name="collegeJoiningDate"
                onChange={handleChange}
              />
            </>
          )}

          {/* Teacher Fields */}
          {role === "teacher" && (
            <>
              <label className="block font-semibold text-gray-700">Department:</label>
              <select
                className="w-full p-2 border rounded-md text-blue-700 font-semibold"
                name="departmentName"
                onChange={handleChange}
              >
                <option value="civil">Civil</option>
                <option value="computer">Computer</option>
                <option value="mechanical">Mechanical</option>
                <option value="electrical">Electrical</option>
              </select>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md font-bold flex items-center justify-center hover:bg-blue-700 transition"
          >
            {loading ? <div className="loader"></div> : "Register"} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
