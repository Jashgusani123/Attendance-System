import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation as StudentLoginMutation } from "../Redux/API/Student";
import { useLoginMutation as TeacherLoginMutation } from "../Redux/API/Teacher";
import { useLoginMutation as AdminLoginMutation } from "../Redux/API/Admin";
import { studentExits, studentNotExits } from "../Redux/slices/StudentSlices";
import { teacherExits, teacherNotExits } from "../Redux/slices/TeacherSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { adminExits } from "../Redux/slices/AdminSlices";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState("student");
  const [studentLogin] = StudentLoginMutation();
  const [teacherLogin] = TeacherLoginMutation();
  const [adminLogin] = AdminLoginMutation();
  const [loading, setloading] = useState(false);
  const [IsError, setIsError] = useState(
    {
      error: false,
      message: ""
    });

  const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "data" in error;
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    enrollmentNumber: "",
    password: "",
    secretkey: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      let res;
      if (role === "student") {
        const obj = {
          fullName: formData.fullName,
          email:formData.email,
          enrollmentNumber: formData.enrollmentNumber,
          password: formData.password,
        }
        res = await studentLogin(obj);
        if (res && "data" in res && res.data?.success) {
          dispatch(teacherNotExits());
          dispatch(studentExits(res.data?.user));
          setIsError({ error: false, message: "" }); // Clear errors on success
        } else {
          setIsError({
            error: true,
            message: isFetchBaseQueryError(res.error)
              ? (res.error.data as { message?: string })?.message || "Login failed"
              : "An unexpected error occurred",
          });
        }
      } else if (role === "teacher") {
        res = await teacherLogin({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        if (res && "data" in res && res.data?.success) {
          dispatch(studentNotExits());
          dispatch(teacherExits(res.data?.user));
          setIsError({ error: false, message: "" });
        } else {
          setIsError({
            error: true,
            message: isFetchBaseQueryError(res.error)
              ? (res.error.data as { message?: string })?.message || "Login failed"
              : "An unexpected error occurred",
          });
        }
      }else{
         res = await adminLogin({
          email:formData.email,
          password:formData.password,
          secretKey:formData.secretkey
         });

         if(res && "data" in res && res.data?.success){
          dispatch(adminExits(res.data?.user))
          setIsError({ error: false, message: "" });
         }else{
          setIsError({
            error: true,
            message: isFetchBaseQueryError(res.error)
              ? (res.error.data as { message?: string })?.message || "Login failed"
              : "An unexpected error occurred",
          });
         }
      }
    } catch (error) {
      setIsError({
        error: true,
        message: "Something went wrong, please try again later!",
      });
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
              onChange={handleChange}
              name="secretkey"
            />
          )}
          {IsError.error && <p className="text-red-800 font-bold">{IsError.message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md font-bold flex items-center justify-center hover:bg-blue-700 transition"
          >
            {loading ? <div className="loader"></div> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
