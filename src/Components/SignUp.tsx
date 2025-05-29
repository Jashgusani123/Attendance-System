import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSignupMutation as StudentSignupMution } from "../Redux/API/Student";
import { useSignupMutation as HodSignupMution } from '../Redux/API/Hod';
import { useCreatePandingRequestMutation as PandingReuestMution } from '../Redux/API/Panding';
import { studentExits } from "../Redux/slices/StudentSlices";
import { StudentRequest } from "../Types/API/StudentApiType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { HodExits } from "../Redux/slices/HodSlices";
import { useNavigate } from "react-router-dom";
import { pandingExits } from "../Redux/slices/PandingSlices";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Capitalize } from "../Utils/toCapitalize";

const SignUp = () => {
  const dispatch = useDispatch();

  const [role, setRole] = useState("student");
  const [StudentSignup] = StudentSignupMution();
  const [HodSignup] = HodSignupMution();
  const [PandingRequest] = PandingReuestMution();
  const [loading, setloading] = useState(false);
  const [collegeLists, setCollegeLists] = useState([]);
  const [departmentLists, setDepartmentLists] = useState<string[]>([]);
  const navigate = useNavigate();
  const [IsError, setIsError] = useState({
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
  interface Response {
    success:boolean,
    departmentNames:string[]
  }
  useEffect(() => {
    const fetchColleges = async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/supported/getallcollege`);
      const data = await response.json();
      if (data.success) {
        setCollegeLists(data.collegeNames);
      }
    };

    return () => {
      fetchColleges();
    }
  }, [role === "student" || role === "teacher"]);

  useEffect(() => {
    const fetchDepartment = async () => {
      if (!formData.collegeName) return;
      setDepartmentLists([])
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/supported/getalldepartment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collegeName: formData.collegeName }),
      });
      const data:Response = await response.json();
      if (data.success) {
        setDepartmentLists(data.departmentNames)
      }
    };

    fetchDepartment(); // ✅ Correct place to call it
  }, [formData.collegeName]); // ✅ Depend only on collegeName change


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
  
    try {
      // 3. Continue submission if all fields are filled
      let res;
      if (role === "student") {
        // 1. Define required fields and their labels
      const requiredFields = {
        fullName: formData.fullName,
        email: formData.email,
        departmentName: formData.departmentName,
        collegeName: formData.collegeName,
        collegeJoiningDate: formData.collegeJoiningDate,
        enrollmentNumber: formData.enrollmentNumber,
        gender: formData.gender,
        password: formData.password,
        semester: formData.semester,
      };
  
      const fieldLabels = {
        fullName: "Full Name",
        email: "Email",
        departmentName: "Department Name",
        collegeName: "College Name",
        collegeJoiningDate: "College Joining Date",
        enrollmentNumber: "Enrollment Number",
        gender: "Gender",
        password: "Password",
        semester: "Semester",
      };
  
      // 2. Find any empty fields
      const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => value === "" || value === 0 || value === null || value === undefined)
      .map(([key]) => fieldLabels[key as keyof typeof fieldLabels]);
    
  
      if (emptyFields.length > 0) {
        setIsError({
          error: true,
          message: `Fille Up This : ${emptyFields.join(", ")}`,
        });
        setloading(false);
        return; 
      }

        const formDataWithLowercase = {
          fullName: formData.fullName.toLowerCase(),
          collegeJoiningDate: formData.collegeJoiningDate.toLowerCase(),
          departmentName: formData.departmentName.toLowerCase(),
          collegeName: formData.collegeName.toLowerCase(),
          email: formData.email.toLowerCase(),
          enrollmentNumber: formData.enrollmentNumber.toLowerCase(),
          password: formData.password,
          semester: formData.semester,
          gender: formData.gender.toLowerCase()
        };
  
        res = await StudentSignup(formDataWithLowercase);
  
        if (res && "data" in res && res.data?.success) {
          const userData = res.data?.user;
          dispatch(studentExits(userData));
          setIsError({ error: false, message: "" });
        } else {
          if ("error" in res && res.error && "data" in res.error) {
            const errorData = res.error as FetchBaseQueryError;
            setIsError({
              error: true,
              message: (errorData.data as { message?: string })?.message || "An unexpected error occurred.",
            });
          } else {
            setIsError({ error: true, message: "An unexpected error occurred." });
          }
        }
  
      } else if (role === "teacher") {
        // 1. Define required fields and their labels
      const requiredFields = {
        fullName: formData.fullName,
        email: formData.email,
        departmentName: formData.departmentName,
        collegeName: formData.collegeName,
        gender: formData.gender,
        password: formData.password,
      };
  
      const fieldLabels = {
        fullName: "Full Name",
        email: "Email",
        departmentName: "Department Name",
        collegeName: "College Name",
        gender: "Gender",
        password: "Password",
      };
  
      // 2. Find any empty fields
      const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => value === "" || value === null || value === undefined)
      .map(([key]) => fieldLabels[key as keyof typeof fieldLabels]);
    
  
      if (emptyFields.length > 0) {
        setIsError({
          error: true,
          message: `Fille Up This : ${emptyFields.join(", ")}`,
        });
        setloading(false);
        return; 
      }
        const obj = {
          fullName: formData.fullName.toLowerCase(),
          email: formData.email.toLowerCase(),
          password: formData.password,
          collegeName: formData.collegeName.toLowerCase(),
          departmentName: formData.departmentName.toLowerCase(),
          gender: formData.gender.toLowerCase()
        };
  
        res = await PandingRequest(obj);
  
        if (res && "data" in res && res.data.success) {
          navigate("/");
          dispatch(pandingExits(res.data.newPanding));
  
          const response = await fetch(`${import.meta.env.VITE_SERVER}/notification/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              type: "request",
              upperHeadding: `${res.data.newPanding.fullName} is Send an Request to ...`,
              description: `${res.data.newPanding.fullName} is Send an Request to Create an Account For \n Teacher, If Yes then Click on Accept otherwise click on Reject Button.`,
              to: res.data.newPanding.hodId,
              pandingId: res.data.newPanding._id
            }),
          });
  
          const data = await response.json();
          if (data.success) {
            alert("Your Request Sent to Department HOD. Wait for acceptance or ask the HOD to accept it.");
          }
  
        } else {
          console.log(res.error);
        }
  
      } else {
        // 1. Define required fields and their labels
      const requiredFields = {
        fullName: formData.fullName,
        email: formData.email,
        departmentName: formData.departmentName,
        collegeName: formData.collegeName,
        gender: formData.gender,
        password: formData.password,
      };
  
      const fieldLabels = {
        fullName: "Full Name",
        email: "Email",
        departmentName: "Department Name",
        collegeName: "College Name",
        gender: "Gender",
        password: "Password",
      };
  
      // 2. Find any empty fields
      const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => value === "" || value === null || value === undefined)
      .map(([key]) => fieldLabels[key as keyof typeof fieldLabels]);
    
  
      if (emptyFields.length > 0) {
        setIsError({
          error: true,
          message: `Fille Up This : ${emptyFields.join(", ")}`,
        });
        setloading(false);
        return; 
      }
        const obj = {
          fullName: formData.fullName.toLowerCase(),
          email: formData.email.toLowerCase(),
          collegeName: formData.collegeName.toLowerCase(),
          password: formData.password,
          departmentName: formData.departmentName.toLowerCase(),
          gender:formData.gender
        };
  
        res = await HodSignup(obj);
  
        if (res && "data" in res && res.data?.success) {
          const userData = res.data?.user;
          dispatch(HodExits(userData));
          setIsError({ error: false, message: "" });
        } else {
          if ("error" in res && res.error && "data" in res.error) {
            const errorData = res.error as FetchBaseQueryError;
            setIsError({
              error: true,
              message: (errorData.data as { message?: string })?.message || "An unexpected error occurred.",
            });
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

  useEffect(() => {
    setFormData({
      fullName: "",
      collegeJoiningDate: "", // Changed to empty string for proper handling
      departmentName: "",
      collegeName: "",
      email: "",
      enrollmentNumber: "",
      password: "",
      semester: 0,
      gender: ""
    });

    setIsError({
      error: false,
      message: ""
    });
  }, [role])


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
          <option value="Hod">HOD</option>
        </select>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Common Name Field */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            required
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            required
            value={formData.password}
            name="password"
            onChange={handleChange}
          />

          {role === "student" && (
            <input
              type="text"
              placeholder="Enrollment Number"
              className="w-full p-2 border rounded-md"
              required
              value={formData.enrollmentNumber}
              name="enrollmentNumber"
              onChange={handleChange}
            />
          )}

          {/* Hod Fields */}
          {role === "Hod" && (
            <>
              <select
              className="w-full p-2 border rounded-md text-blue-700 font-semibold"
              name="collegeName"
              required
              value={Capitalize(formData.collegeName)}
              onChange={handleChange}
            >
              <option value="">Select College</option>
              {collegeLists?.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
              {/* Department  */}
              <select
                className={`${formData.collegeName === "" ? "text-gray-600" : "text-blue-700"} w-full p-2 border rounded-md font-semibold`}
                name="departmentName"
                value={Capitalize(formData.departmentName)}
                required
                onChange={handleChange}
              >
                <option value="" > {formData.collegeName === ""
                  ? "First Select College Name"
                  : "Select Department"}</option>
                {departmentLists.length > 0 && formData.collegeName !== "" && departmentLists.map((i) => (
                  <option value={i}>{i}</option>
                ))}
              </select>

            </>

          )}
          {(role === "student" || role === "teacher") && (
            <select
              className="w-full p-2 border rounded-md text-blue-700 font-semibold"
              name="collegeName"
              required
              value={formData.collegeName}
              onChange={handleChange}
            >
              <option value="">Select College</option>
              {collegeLists?.map((i) => (
                <option value={i}>{Capitalize(i)}</option>
              ))}
            </select>
          )}



          {role === "student" && (
            <>

              {/* Department  */}
              <select
                className={`${formData.collegeName === "" ? "text-gray-600" : "text-blue-700"} w-full p-2 border rounded-md font-semibold`}
                name="departmentName"
                value={Capitalize(formData.departmentName)}
                required
                onChange={handleChange}
              >
                <option value="" > {formData.collegeName === ""
                  ? "First Select College Name"
                  : "Select Department"}</option>
                {departmentLists.length > 0 && formData.collegeName !== "" && departmentLists.map((i) => (
                  <option value={i}>{i}</option>
                ))}
              </select>
            </>
          )}



          {/* Student Fields */}
          {role === "student" && (
            <>
              <select
                className="w-full p-2 border rounded-md text-blue-700 font-semibold"
                name="semester"
                required
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>

            </>
          )}

          {/* Teacher Fields */}
          {role === "teacher" && (
            <>
              {/* Department  */}
              
              <select
                className={`${formData.collegeName === "" ? "text-gray-600" : "text-blue-700"} w-full p-2 border rounded-md font-semibold`}
                name="departmentName"
                required
                value={Capitalize(formData.departmentName)}
                onChange={handleChange}
              >
                <option value="" > {formData.collegeName === ""
                  ? "First Select College Name"
                  : "Select Department"}</option>
                {departmentLists.length > 0 && formData.collegeName !== "" && departmentLists.map((i) => (
                  <option value={i}>{i}</option>
                ))}
              </select>
            </>

          )}

          {/* Gender */}
          <select
            className="w-full p-2 border rounded-md text-blue-700 font-semibold"
            name="gender"
            value={formData.gender}
            required
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {role === "student" && (
            <>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="College Joining Date"
                    className="w-full"
                    value={formData.collegeJoiningDate ? new Date(formData.collegeJoiningDate) : null}
                    onChange={(newValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        collegeJoiningDate: newValue ? newValue.toISOString().split("T")[0] : "", // format as yyyy-mm-dd
                      }));
                    }}
                  />
                </LocalizationProvider>
              </div>
            </>)}


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
