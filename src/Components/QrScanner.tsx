import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface ScannerProps {
  onScanSuccess: (text: string) => void;
  onClose: () => void;
}

const QrScanner = ({ onScanSuccess, onClose }: ScannerProps) => {
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const qrScanner = new Html5QrcodeScanner(
      "qr-scanner",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    qrScanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        qrScanner.clear();
        onClose(); // Close scanner after successful scan
      },
      (errorMessage) => {
        console.log("QR Code scan failed: ", errorMessage);
      }
    );

    setScanner(qrScanner);

    return () => {
      qrScanner.clear().catch((err) => console.log("Failed to clear scanner", err));
    };
  }, [onScanSuccess, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
        <h2 className="text-xl font-bold text-center mb-2">Scan QR Code</h2>
        <div id="qr-scanner" className="w-full h-64 border border-gray-300 rounded"></div>
        <button onClick={onClose} className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default QrScanner;
