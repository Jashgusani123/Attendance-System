import { useState } from "react";

const LoginForm = () => {
  const [role, setRole] = useState("student");

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
        
        <form className="space-y-4">
          {/* Common Name Field */}
          {role !== "admin" && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" 
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border rounded-md" 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border rounded-md" 
            required 
          />
          
          {/* Student Fields */}
          {role === "student" && (
            <>
              <input 
                type="text" 
                placeholder="Enrollment Number" 
                className="w-full p-2 border rounded-md" 
                required 
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
