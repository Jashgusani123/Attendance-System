import { BrowserMultiFormatReader } from '@zxing/library';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface QrScannerProps {
  onScanSuccess: (text: string) => void;
  onClose: () => void;
}

const QrScannerPage = ({ onScanSuccess, onClose }: QrScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = new BrowserMultiFormatReader();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          onScanSuccess(result.getText());
          setScanned(true);  // Trigger animation
          codeReader.reset();
          onClose();
        }
        if (error) {
          console.error('Error decoding QR code:', error);
        }
      });
    }

    return () => {
      codeReader.reset();
    };
  }, [onScanSuccess, onClose]);

  return (
    <div className="qr-scanner-container">
      <div className="scanner-inner">
        {/* Close Button */}
        <Link to="/student" className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </Link>

        {/* QR Scanner */}
        <div className={`scanner-video-wrapper ${scanned ? 'scanned' : ''}`}>
          <video ref={videoRef} className="scanner-video" width="100%" />
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="scanner-close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default QrScannerPage;
