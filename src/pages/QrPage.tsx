import React from "react";
// TODO: Integrate qrcode-generator, zxing-browser

export default function QrPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">QR Surface</h2>
      {/* QR encode/decode, Base45, scanner */}
      <div className="border rounded p-8 text-center text-gray-500">
        <p>QR encoding & scanner coming soon.</p>
      </div>
    </div>
  );
}