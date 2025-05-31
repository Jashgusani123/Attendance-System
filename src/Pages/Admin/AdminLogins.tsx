import { useState } from "react";

const AdminLogins = () => {
  const [isSecretKey, setIsSecretKey] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  // ✅ 1. Register fingerprint/passkey (one time)
  async function registerFingerprintCredential() {
    const publicKey: PublicKeyCredentialCreationOptions = {
      challenge: new Uint8Array(32), // should be random from server
      rp: { name: "My Admin Portal" },
      user: {
        id: new Uint8Array(16),
        name: "admin@example.com",
        displayName: "Admin",
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
      authenticatorSelection: {
        userVerification: "required",
        authenticatorAttachment: "platform", // use fingerprint sensor if available
      },
      timeout: 60000,
      attestation: "none",
    };

    try {
      const credential = await navigator.credentials.create({ publicKey });
      console.log("Credential registered:", credential);
      alert("Fingerprint registered successfully!");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  }

  // ✅ 2. Authenticate with fingerprint/passkey
  async function verifyFingerprint(e: React.MouseEvent) {
    e.preventDefault();

    const publicKey: CredentialRequestOptions = {
      publicKey: {
        challenge: new Uint8Array(32), // should be random from server
        timeout: 60000,
        allowCredentials: [],
        userVerification: "required" as const,
      },
    };

    try {
      const credential = await navigator.credentials.get(publicKey);
      console.log("Fingerprint verified:", credential);

      // 🔐 Send to backend for validation (optional)
      const res = await fetch("/api/admin/fingerprint-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true }),
      });

      if (res.ok) {
        alert("Access granted via fingerprint!");
        // redirect to admin panel
      } else {
        alert("Fingerprint failed on server");
      }
    } catch (err) {
      console.error("Fingerprint verification failed:", err);
    }
  }

  // ✅ 3. Secret Key Login
  async function submitSecretKey(e: React.MouseEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/secret-key-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: secretKey }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Access granted via secret key!");
      // redirect to admin panel
    } else {
      alert("Invalid secret key");
    }
  }

  return (
    <>
      <div className="login_container h-screen flex justify-center items-center bg-blue-100">
        <form className="bg-white flex justify-center gap-4 items-center flex-col w-96 h-96 rounded-2xl">
          {!isSecretKey && (
            <>
              <button
                className="bg-blue-200 rounded-3xl p-2 font-bold w-50"
                onClick={verifyFingerprint}
              >
                Verify With Fingerprint
              </button>
              <button
                onClick={() => setIsSecretKey(true)}
                className="bg-blue-200 rounded-3xl p-2 font-bold w-50"
              >
                Use Secret Key
              </button>
              <button
                className="bg-green-300 rounded-3xl p-2 font-bold w-50"
                onClick={(e) => {
                  e.preventDefault();
                  registerFingerprintCredential();
                }}
              >
                Register Fingerprint
              </button>
            </>
          )}

          {isSecretKey && (
            <>
              <input
                type="password"
                placeholder="Enter Secret Key Here"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={submitSecretKey}
                className="bg-blue-300 rounded-3xl p-2 font-bold w-50"
              >
                Submit Secret Key
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default AdminLogins;
