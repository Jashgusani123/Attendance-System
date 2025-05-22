import { useEffect, useState } from "react";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const SignUp = () => {
  const dispatch = useDispatch();

  const [role, setRole] = useState("student");
  const [StudentSignup] = StudentSignupMution();
  const [AdminSignup] = AdminSignupMution();
  const [PandingRequest] = PandingReuestMution();
  const [loading, setloading] = useState(false);
  const [collegeLists, setCollegeLists] = useState([]);
  const [departmentLists, setDepartmentLists] = useState([]);
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
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/supported/getalldepartment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collegeName: formData.collegeName }),
      });
      const data = await response.json();
      if (data.success) {
        setDepartmentLists(data.departmentNames);
      }
    };

    fetchDepartment(); // ✅ Correct place to call it
  }, [formData.collegeName]); // ✅ Depend only on collegeName change


  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);

    try {
      let res;

      if (role === "student") {
        const formDataWithLowercase = {
          fullName: formData.fullName.toLowerCase(),
          collegeJoiningDate: formData.collegeJoiningDate.toLowerCase(), // Changed to empty string for proper handling
          departmentName: formData.departmentName.toLowerCase(),
          collegeName: formData.collegeName.toLowerCase(),
          email: formData.email.toLowerCase(),
          enrollmentNumber: formData.enrollmentNumber.toLowerCase(),
          password: formData.password,
          semester: formData.semester,
          gender: formData.gender.toLowerCase()
        }
        res = await StudentSignup(formDataWithLowercase);
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
          fullName: formData.fullName.toLowerCase(),
          email: formData.email.toLowerCase(),
          password: formData.password,
          collegeName: formData.collegeName.toLowerCase(),
          departmentName: formData.departmentName.toLowerCase(),
          gender: formData.gender.toLowerCase()
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
              type: "request",
              upperHeadding: `${res.data.newPanding.fullName} is Send an Request to ...`,
              description: `${res.data.newPanding.fullName} is Send an Request to Create an Account For \n Teacher, If Yess then Click on Accept otherwise click on Reject Button .`,
              to: res.data.newPanding.adminId,
              pandingId: res.data.newPanding._id
            }),
          });
          const data = await response.json();
          if (data.success) {
            alert("Your Request Send to Department HOD ... \n Wait to for Accept Request ( or You can ask to accept the request to the HOD ).")
          }
        } else {
          console.log(res.error);
        }

      } else {
        //Add Here Admin For Gender
        const obj = {
          fullName: formData.fullName.toLowerCase(),
          email: formData.email.toLowerCase(),
          collegeName: formData.collegeName.toLowerCase(),
          password: formData.password,
          departmentName: formData.departmentName.toLowerCase()
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

          {role === "student" && (
            <input
              type="text"
              placeholder="Enrollment Number"
              className="w-full p-2 border rounded-md"
              required
              name="enrollmentNumber"
              onChange={handleChange}
            />
          )}

          {/* Admin Fields */}
          {role === "admin" && (
            <>
              {/* Department  */}
              <input
                type="text"
                placeholder="Department Name"
                className="w-full p-2 border rounded-md font-semibold"
                name="departmentName"
                onChange={handleChange}
              ></input>
            </>

          )}

          <select
            className="w-full p-2 border rounded-md text-blue-700 font-semibold"
            name="collegeName"
            onChange={handleChange}
          >
            <option value="">Select College</option>
            {collegeLists?.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>


          {role === "student" && (
            <>

              {/* Department  */}
              <select
                className={`${formData.collegeName === "" ? "text-gray-600" : "text-blue-700"} w-full p-2 border rounded-md font-semibold`}
                name="departmentName"
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
