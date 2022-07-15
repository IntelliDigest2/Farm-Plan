import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import React, { useEffect } from "react";
import "./QRCode.css";

// const qrcodeRegionId = "html5qr-code-full-region";

// function Html5QrCodePlugin() {
//   function onScanSuccess(decodedText, decodedResult) {
//     // handle the scanned code as you like, for example:
//     console.log(`Code matched = ${decodedText}`, decodedResult);
//   }

//   function onScanFailure(error) {
//     // handle scan failure, usually better to ignore and keep scanning.
//     // for example:
//     console.warn(`Code scan error = ${error}`);
//   }

//   let html5QrcodeScanner = new Html5QrcodeScanner(
//     "reader",
//     { fps: 10, qrbox: { width: 250, height: 250 } },
//     /* verbose= */ false
//   );
//   html5QrcodeScanner.render(onScanSuccess, onScanFailure);

//   useEffect(() => {

//   }, [])

//   return <div id="reader" width="600px"></div>;
// }

export default function Scanner() {
  return (
    <div className="scanner">
      <div className="title">
        <h2>QR code scanner</h2>
      </div>
    </div>
  );
}
