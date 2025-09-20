import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginAdminMutation, useLoginCredentialMutation, useVerifyLoginMutation } from "../../Redux/API/Admin";
import { AdminExits } from "../../Redux/slices/AdminSlices";
import { startAuthentication } from "@simplewebauthn/browser";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Login] = useLoginAdminMutation();
    const [FingerprintLogin] = useLoginCredentialMutation();
    const [FingerprintVerify] = useVerifyLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await Login({ email, password });
        if (res && "data" in res && res.data?.success) {
            dispatch(AdminExits(res.data.user));
            window.location.reload();
        } else {
            alert("Login failed");
        }
    };

    const handleFingerprintLogin = async () => {
        try {   
            if(!email) 
            {
                alert("Please enter the email First !")
                return
            }
                const FirstStep = await FingerprintLogin({Id:email})
                const secondStep = await startAuthentication(FirstStep.data?.options);
                const LoginVerify = await FingerprintVerify({email , cred:secondStep})
                
            if (LoginVerify && LoginVerify.data?.success) {
                dispatch(AdminExits(LoginVerify.data.user));
                navigate("/admin");
            } else {
                alert("Faild to login ");
            }
        } catch (err) {
            console.error("Fingerprint login error", err);
            alert("Please, In Admin Setting integreat Fingerprint system.");    
        }
    };
    

    return (
        <div className="login_container h-screen w-full flex justify-center items-center bg-blue-100">
            <form onSubmit={handleLogin} className="p-4 bg-white rounded-lg shadow-md w-96 flex flex-col gap-4">
                <button className="bg-white rounded-2xl p-2 absolute top-10 left-10 cursor-pointer" onClick={()=>{navigate("/")}}><ArrowLeft/></button>
                <img src="https://sales.webtel.in/images/Login-page-character1.png" alt="" className="loginFormsImage h-30" />
                <h2 className="text-xl font-bold text-center">Admin Login</h2>
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">Login</button>

                <div className="text-center text-gray-500">or</div>

                <button type="button" onClick={handleFingerprintLogin} className="cursor-pointer bg-green-500 text-white p-2 rounded">
                    Login with Fingerprint
                </button>
                <button type="button" onClick={()=>{navigate("/admin/registraction")}} className="cursor-pointer text-blue-500 p-2 rounded">
                    Registartation
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
