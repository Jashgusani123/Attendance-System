import { useState } from "react";
import { useFingerprintRegisterMutation } from "../../Redux/API/Admin";
import { useSelector } from "react-redux";
import { AdminReducerInitialState } from "../../Types/API/AdminType";

const AdminSetting = () => {
    const { loading: adminLoading, admin } = useSelector(
        (state: { admin: AdminReducerInitialState }) => state.admin
    );
    const [email] = useState(admin?.email); // Static fetched email
    const [FingerprintRegister] = useFingerprintRegisterMutation();
    const registerFingerprint = async () => {
        const publicKey: PublicKeyCredentialCreationOptions = {
            challenge: new Uint8Array(32),
            rp: { name: "Admin Portal" },
            user: {
                id: new Uint8Array(16),
                name: email ? email : "abc@gmail.com",
                displayName: "Admin",
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "required" as const,
            },
            timeout: 60000,
            attestation: "none",
        };

        try {
            const credential = await navigator.credentials.create({ publicKey }) as PublicKeyCredential;
            const rawId = btoa(String.fromCharCode(...new Uint8Array(credential!.rawId)));

            const res = await FingerprintRegister({
                credentialID: rawId,
                publicKey: "dummy-public-key",
                counter: 0,
                transports: ["internal"],
            })

            if (res.data?.message) {
                alert("Fingerprint registered!");
            } else {
                alert("Failed to register fingerprint");
            }
        } catch (err) {
            console.error("Fingerprint registration error:", err);
            alert("Fingerprint registration failed");
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
