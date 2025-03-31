import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignupMutation as StudentSignupMution } from "../Redux/API/Student";
import { useSignupMutation as AdminSignupMution } from '../Redux/API/Admin';
import { useCreatePandingRequestMutation as PandingReuestMution } from '../Redux/API/Panding';
import { studentExits } from "../Redux/slices/StudentSlices";
import { StudentRequest } from "../Types/API/StudentApiType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { adminExits } from "../Redux/slices/AdminSlices";
import { useNavigate } from "react-router-dom";
import { pandingExits } from "../Redux/slices/PandingSlices";

const SignUp = () => {
  const dispatch = useDispatch();

  const [role, setRole] = useState("student");
  const [StudentSignup] = StudentSignupMution();
  const [AdminSignup] = AdminSignupMution();
  const [PandingRequest] = PandingReuestMution();
  const [loading, setloading] = useState(false)
  const [IsError, setIsError] = useState(
    {
      error: false,
      message: ""
    });
  const [formData, setFormData] = useState<StudentRequest>({
    fullName: "",
    collegeJoiningDate: "", // Changed to empty string for proper handling
    departmentName: "",
    collegeName: "",
    email: "",
    enrollmentNumber: "",
    password: "",
    semester: 1,
    gender: ""
  });

  const navigate = useNavigate();

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
          setIsError({ error: false, message: "" });
        } else {
          if ("error" in res && res.error && "data" in res.error) {
            const errorData = res.error as FetchBaseQueryError;
            setIsError({ error: true, message: (errorData.data as { message?: string })?.message || "An unexpected error occurred." });
          } else {
            setIsError({ error: true, message: "An unexpected error occurred." });
          }
        }

      } else if (role == "teacher") {
        const obj = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          collegeName: formData.collegeName,
          departmentName: formData.departmentName,
          gender: formData.gender
        }
        res = await PandingRequest(obj);
        if (res && "data" in res && res.data.success) {
          navigate("/");
          dispatch(pandingExits(res.data.newPanding));
          const response = await fetch(`${import.meta.env.VITE_SERVER}/notification/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              type:"request",
              upperHeadding:`${res.data.newPanding.fullName} is Send an Request to ...`,
              description:`${res.data.newPanding.fullName} is Send an Request to Create an Account For \n Teacher, If Yess then Click on Accept otherwise click on Reject Button .`,
              to:res.data.newPanding.adminId,
              pandingId:res.data.newPanding._id
            }),
          });
          const data = await response.json();
          if(data.success){
            alert("Your Request Send to Department HOD ... \n Wait to for Accept Request ( or You can ask to accept the request to the HOD ).")
          }
        } else {
          console.log(res.error);
        }

      } else {
        const obj = {
          fullName: formData.fullName,
          email: formData.email,
          collegeName: formData.collegeName,
          password: formData.password,
          departmentName: formData.departmentName
        }
        res = await AdminSignup(obj);
        if (res && "data" in res && res.data?.success) {
          const userData = res.data?.user;
          dispatch(adminExits(userData));
          setIsError({ error: false, message: "" });
        } else {
          if ("error" in res && res.error && "data" in res.error) {
            const errorData = res.error as FetchBaseQueryError;
            setIsError({ error: true, message: (errorData.data as { message?: string })?.message || "An unexpected error occurred." });
          } else {
            setIsError({ error: true, message: "An unexpected error occurred." });
          }
        }
      }
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
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
          <label className="block font-semibold text-gray-700">Department:</label>
          <select
            className="w-full p-2 border rounded-md text-blue-700 font-semibold"
            name="departmentName"
            onChange={handleChange}
          >
            <option value="Civil">Civil</option>
            <option value="Computer">Computer</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
          </select>
          <label className="block font-semibold text-gray-700">Gender:</label>
          <select
            className="w-full p-2 border rounded-md text-blue-700 font-semibold"
            name="gender"
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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

            </>
          )}
          {IsError.error && <p className="text-red-800 font-bold">{IsError.message}</p>}
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
