import { useState } from "react";
import { useCreateAdminMutation } from "../../Redux/API/Admin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AdminExits } from "../../Redux/slices/AdminSlices";
import { ArrowLeft } from "lucide-react";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Registration] = useCreateAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await Registration({ email, password });

    const userData = res.data?.user;
    dispatch(AdminExits(userData!));
    if (res && "data" in res && res.data?.success) {
      alert("Registered successfully!");
      navigate("/admin")
    } else {
      alert("Registration failed");
    }
  }

  return (
    <div className="signin_container h-screen w-full flex justify-center items-center bg-blue-100">
      <form onSubmit={handleRegister} className="p-4 bg-white rounded-lg shadow-md w-96 flex flex-col gap-4">
      <button className="bg-white rounded-2xl p-2 absolute top-10 left-10 cursor-pointer" onClick={()=>{navigate("/")}}><ArrowLeft/></button>
        <img src="https://png.pngtree.com/png-clipart/20220430/original/pngtree-cyber-security-concept-in-3d-isometric-outline-design-user-uses-secure-png-image_7601742.png" alt="" className="loginFormsImage" />
        <h2 className="text-xl font-bold text-center ">Admin Register</h2>
        <input
          type="email"
          placeholder="Email"
          required
          className="p-2 border rounded border-blue-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="p-2 border rounded border-blue-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
        <button type="button" onClick={() => { navigate("/admin/login") }} className=" cursor-pointer text-blue-500 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
