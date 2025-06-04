import { useState } from "react";
import {useRegisterPasskeyMutation , useVerifyPasskeyMutation } from "../../Redux/API/Admin";
import { useSelector } from "react-redux";
import { AdminReducerInitialState } from "../../Types/API/AdminType";
import { startRegistration } from '@simplewebauthn/browser'

const AdminSetting = () => {
    const { loading: adminLoading, admin } = useSelector(
        (state: { admin: AdminReducerInitialState }) => state.admin
    );
    const [email] = useState(admin?.email); // Static fetched email
    const [RegistartationPasskey] = useRegisterPasskeyMutation();
    const [verifyCredential] = useVerifyPasskeyMutation();

    const registerFingerprint = async () => {
        const FirstStep = await RegistartationPasskey({Id:admin?._id!});
        const SecondStep = await startRegistration(FirstStep.data?.options);
        const VerifyCredential = await verifyCredential({Id:admin?._id!,cred:SecondStep});
        if(VerifyCredential.data?.success){
            alert("Successfully Done")
        }
    };

    return adminLoading ? <h1>Loading...</h1> : (
        <div className="setting_container h-screen flex justify-center items-center">
            <div className="p-6 w-96 mx-auto bg-gray-900 text-white rounded-2xl shadow-xl space-y-6">
                <h2 className="text-2xl font-bold text-blue-400">⚙️ Admin Settings</h2>

                <div>
                    <label className="block font-semibold text-gray-300 mb-1">Email</label>
                    <div className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2">
                        {email}
                    </div>
                </div>

                <hr className="border-gray-700" />

                <div>
                    <button
                        onClick={registerFingerprint}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-semibold transition w-full"
                    >
                        Register Fingerprint
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSetting;
