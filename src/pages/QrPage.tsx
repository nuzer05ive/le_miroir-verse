import React, { useState } from 'react';
import QRCode from 'qrcode-generator';

export default function QrPage() {
  const [qrValue] = useState('.s.core base45 demo');

  const createQrDataUrl = () => {
    const qr = QRCode(0, 'L');
    qr.addData(qrValue);
    qr.make();
    return qr.createDataURL(8);
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">QR Loader</h1>
      <img src={createQrDataUrl()} alt="QR code" />
    </main>
  );
}
